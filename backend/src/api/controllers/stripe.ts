import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import stripeConf from "../../config/stripeClient";
import checkAuth from "../../middleware/checkAuth";

const stripe = stripeConf();

const startSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    checkAuth(req, res, async () => {
      const db = admin.firestore();

      const userId = (res as any).userId;

      const userDocRef = db.collection("users").doc(userId);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        res.status(404).json({ error: "User not found. Contact admin." });
        return;
      }

      const stripeCustomerId = userDoc.data()?.stripeCustomerId;

      if (!stripeCustomerId) {
        res
          .status(404)
          .json({ error: "User not found. Please contact admin." });
        return;
      }

      const stripeSubscriptionId = userDoc.data()?.stripeSubscriptionId;

      if (!stripeSubscriptionId) {
        res
          .status(200)
          .json({ message: "Something went wrong. Please contact admin." });
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
          res
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
          res
            .status(200)
            .json({ created, current_period_end, cancel_at_period_end });
        }
      }
    });
  } catch (error) {
    console.error("Error starting subscription:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const cancelSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    checkAuth(req, res, async () => {
      const db = admin.firestore();
      const userId = (res as any).userId;

      const userDocRef = db.collection("users").doc(userId);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const stripeSubscriptionId = userDoc.data().stripeSubscriptionId;

      const subscription = await stripe.subscriptions.update(
        stripeSubscriptionId,
        {
          cancel_at_period_end: true,
        }
      );
      const { created, current_period_end, cancel_at_period_end } =
        subscription;
      res
        .status(200)
        .json({ created, current_period_end, cancel_at_period_end });
    });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSubscriptionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    checkAuth(req, res, async () => {
      const db = admin.firestore();

      const userId = (res as any).userId;
      const userDocRef = db.collection("users").doc(userId);

      const userDoc = await userDocRef.get();
      if (!userDoc.exists) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const stripeSubscriptionId = userDoc.data()?.stripeSubscriptionId;

      if (stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(
          stripeSubscriptionId
        );
        if (subscription.status === "canceled") {
          res.status(200).json(null);
          return;
        }
        const { created, current_period_end, cancel_at_period_end } =
          subscription;
        res
          .status(200)
          .json({ created, current_period_end, cancel_at_period_end });
        return;
      } else {
        return res.status(200).json(null);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export { startSubscription, cancelSubscription, getSubscriptionById };
