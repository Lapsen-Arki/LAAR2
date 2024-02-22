import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import stripeConf from "../../config/stripeClient";
import { getUserIdFromToken } from "../../utils/getUserIdFromTokenUtil";

const stripe = stripeConf();

const startSubscription = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const db = admin.firestore();

    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      return res.status(401).json({ error: "Token missing" });
    }

    const userId = await getUserIdFromToken(idToken);
    if (!userId) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found. Contact admin." });
    }

    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (!stripeCustomerId) {
      return res.status(404).json({ error: "User not found. Contact admin." });
    }

    const stripeSubscriptionId = userDoc.data()?.stripeSubscriptionId;

    if (!stripeSubscriptionId) {
      return res.status(200).json({ message: "Something went wrong. Please contact admin." });
    } else {
      const oldSubscription = await stripe.subscriptions.retrieve(
        stripeSubscriptionId
      );

      if (oldSubscription.status != "canceled") {
        // jos vanha tilaus on lopetettu, mutta maksettua jäsenyyttä on vielä jäljellä
        const resumeSubscription = await stripe.subscriptions.update(
          stripeSubscriptionId,
          {
            cancel_at_period_end: false,
          }
        );
        const { created, current_period_end, cancel_at_period_end } =
          resumeSubscription;
        return res
          .status(200)
          .json({ created, current_period_end, cancel_at_period_end });
      } else {
        // vanha tilaus on lopetettu, ja jäljellä oleva aika on myös loppunut
        const newSubscription = await stripe.subscriptions.create({
          customer: stripeCustomerId,
          items: [{ plan: "price_1ObLeAK45umi2LZd5XwwYvam" }],
        });
        await userDocRef.update({ stripeSubscriptionId: newSubscription.id });
        const { created, current_period_end, cancel_at_period_end } =
          newSubscription;
        return res
          .status(200)
          .json({ created, current_period_end, cancel_at_period_end });
      }
    }
  } catch (error) {
    console.error("Error starting subscription:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const cancelSubscription = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const db = admin.firestore();

    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      return res.status(401).json({ error: "Missing token" });
    }

    const userId = await getUserIdFromToken(idToken);
    if (!userId) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const stripeSubscriptionId = userDoc.data().stripeSubscriptionId;

    const subscription = await stripe.subscriptions.update(
      stripeSubscriptionId,
      {
        cancel_at_period_end: true,
      }
    );
    const { created, current_period_end, cancel_at_period_end } = subscription;
    return res
      .status(200)
      .json({ created, current_period_end, cancel_at_period_end });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSubscriptionById = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const db = admin.firestore();

    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      return res.status(401).json({ error: "Missing token" });
    }

    const userId = await getUserIdFromToken(idToken);
    if (!userId) {
      return res.status(403).json({ error: "Invalid token" });
    }
    const userDocRef = db.collection("users").doc(userId);

    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const stripeSubscriptionId = userDoc.data()?.stripeSubscriptionId;

    if (stripeSubscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(
        stripeSubscriptionId
      );
      if (subscription.status === "canceled") {
        return res.status(200).json(null);
      }
      const { created, current_period_end, cancel_at_period_end } =
        subscription;
      return res
        .status(200)
        .json({ created, current_period_end, cancel_at_period_end });
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { startSubscription, cancelSubscription, getSubscriptionById };
