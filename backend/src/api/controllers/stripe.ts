import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import stripeConf from "../../config/stripeClient";

const stripe = stripeConf();

const startSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const db = admin.firestore();
    const userId = req.params.id;

    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      res.status(404).json({ error: "User not found. Contact admin." });
    }

    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (!stripeCustomerId) {
      res.status(404).json({ error: "User not found. Contact admin." });
    }

    const stripeSubscriptionId = userDoc.data()?.stripeSubscriptionId;

    if (!stripeSubscriptionId) {
      res.status(200).json({ message: "Ota yhteyttä ylläpitoon" });
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
        res.status(200).send();
      } else {
        // vanha tilaus on lopetettu, ja jäljellä oleva aika on myös loppunut
        const newSubscription = await stripe.subscriptions.create({
          customer: stripeCustomerId,
          items: [{ plan: "price_1ObLeAK45umi2LZd5XwwYvam" }],
        });
        await userDocRef.update({ stripeSubscriptionId: newSubscription.id });
        res.status(200).send();
      }
    }
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
    const db = admin.firestore();
    const userId = req.params.id;

    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      res.status(404).json({ error: "User not found" });
    }

    const stripeSubscriptionId = userDoc.data().stripeSubscriptionId;

    const subscription = await stripe.subscriptions.update(
      stripeSubscriptionId,
      {
        cancel_at_period_end: true,
      }
    );
    res.status(200).send();
  } catch (error) {
    console.error("Error canceling subscription:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSubscriptionById = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const db = admin.firestore();
    const userId = req.params.id;
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
    console.error("backend - backendissä tapahtui error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { startSubscription, cancelSubscription, getSubscriptionById };
