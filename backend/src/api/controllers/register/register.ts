import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import validateAndSanitizeName from "./validateAndSanitizeName";
import validatePassword from "./validatePassword";
import { RegisterData } from "../../../types/registerData";
import stripeConf from "../../../config/stripeClient";

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

    // Create a new user using Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    const registrationDate = new Date();
    const db = admin.firestore();

    const usersCollection = db.collection("users");

    await usersCollection.doc(userRecord.uid).set({
      name: isValidName,
      email: email,
      registrationDate: registrationDate,
      stripeTokenId: tokenId,
    });

    // TODO: NOW START NEW SUBSCRIPTION AND 14 DAY TRIAL

    try {
      const stripe = stripeConf();

      const customer = await stripe.customers.create({
        email: email,
        source: tokenId,
      });

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: "price_1ObLeAK45umi2LZd5XwwYvam" }], // THIS IS TEST PLAN -> CHANGE FOR PRODUCTION
        trial_period_days: 14,
      });
      console.log("Subscription created:", subscription);
    } catch (error) {
      console.error("Error creating subscription: ", error);
    }

    res
      .status(201)
      .send(
        `User created successfully and subscription started: ${userRecord.uid}`
      );
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export default registerUser;
