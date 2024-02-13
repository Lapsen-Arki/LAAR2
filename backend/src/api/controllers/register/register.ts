import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import validateAndSanitizeName from "./validateAndSanitizeName";
import validatePassword from "./validatePassword";
import { RegisterData } from "../../../types/typesBackend";
import stripeConf from "../../../config/stripeClient";
import crypto from "crypto";
import sendVerification from "../../../utils/sendVerification";

// Registration function
const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password, confirmPassword, accept, token } =
      req.body as RegisterData;

    // Stripe token
    const tokenId = token.id;

    // Validating password and name. Firebase should validate email already.
    const isPasswordValid = validatePassword(password, confirmPassword, res);
    const isValidName = validateAndSanitizeName(name, res);

    if (!isPasswordValid || !isValidName) {
      return; // Halt registration process if validation fails, response is already sent
    }
    if (!accept) {
      throw new Error(
        "Et voi rekisteröityä hyväksymättä tietosuojaselostetta ja palvelun käyttöehtoja | You cannot register without accepting the privacy statement and the terms of the service"
      );
    }

    const stripe = stripeConf();

    const customer = await stripe.customers.create({
      email: email,
      source: tokenId,
    });

    // Starting new subscription and 14 day trial:
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: "price_1ObLeAK45umi2LZd5XwwYvam" }], // THIS IS TEST PLAN -> CHANGE FOR PRODUCTION
      trial_period_days: 14,
      cancel_at_period_end: true,
    });

    // Create a new user using Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    const verificationCode = crypto.randomBytes(16).toString("hex");

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    // Save user to firebase users collection
    const registrationDate = new Date();
    const db = admin.firestore();
    const usersCollection = db.collection("users");
    await usersCollection.doc(userRecord.uid).set({
      name: isValidName,
      email: email,
      registrationDate: registrationDate,
      stripeCustomerId: customer.id,
      stripeCardTokenId: tokenId,
      stripeSubscriptionId: subscription.id,
      emailVerified: false,
      verificationCode: verificationCode,
      codeExpires: expirationDate,
    });

    sendVerification(email, verificationCode, expirationDate);

    res
      .status(201)
      .send(
        `User created successfully and subscription started: ${userRecord.uid}`
      );
  } catch (error: any) {
    res.status(500).send(`Registration failed:  ${error.message || error}`);
  }
};

export default registerUser;
