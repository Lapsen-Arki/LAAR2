import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import validateAndSanitizeName from "./validateAndSanitizeName";
import validatePassword from "./validatePassword";
import { RegisterData } from "../../../types/typesBackend";
import stripeConf from "../../../config/stripeClient";

// Registration function
const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      name,
      phoneNumber,
      password,
      confirmPassword,
      accept,
      token,
    } = req.body as RegisterData;

    // Stripe token
    const stripeCardTokenId = token.id;
    let validatedPhone: string | null = phoneNumber;
    // Validate phoneNumber
    const phoneRegex = /^(?:\+(?:[0-9] ?){6,14}[0-9]|\d{7,10})$/;
    if (phoneNumber.length > 0) {
      if (!phoneRegex.test(phoneNumber)) {
        throw new Error(
          "Puhelinnumero ei ole oikeassa muodossa | Phone number is not in the correct format"
        );
      } else {
        validatedPhone = phoneNumber;
      }
    } else {
      validatedPhone = null;
    }
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
      displayName: isValidName,
    });

    const stripe = stripeConf();

    const customer = await stripe.customers.create({
      email: email,
      source: stripeCardTokenId,
    });
    console.log("Customer created: ", customer);
    // Starting new subscription and 14 day trial:
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan:
            process.env.STRIPE_PRICE_PLAN || "price_1ObLeAK45umi2LZd5XwwYvam",
        },
      ], // THIS IS TEST PLAN -> CHANGE FOR PRODUCTION
      trial_period_days: 14,
      cancel_at_period_end: true, // this will be updated to false when the user confirms their email address at the first login
    });
    console.log("Subscription created: ", subscription);
    console.log("User created: ", userRecord);
    // Save user to firebase users collection
    const registrationDate = new Date();
    const db = admin.firestore();
    const usersCollection = db.collection("users");
    await usersCollection.doc(userRecord.uid).set({
      name: isValidName,
      email: email,
      phoneNumber: validatedPhone,
      registrationDate: registrationDate,
      stripeCustomerId: customer.id,
      stripeCardTokenId: stripeCardTokenId,
      stripeSubscriptionId: subscription.id,
    });
    console.log("User saved to Firestore: ", userRecord.uid);
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
