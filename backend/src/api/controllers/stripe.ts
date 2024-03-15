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

    const userId = (res as any).userId;

    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      res.status(404).json({ error: "User not found. Contact admin." });
      return;
    }

    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (!stripeCustomerId) {
      res.status(404).json({ error: "User not found. Please contact admin." });
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
          items: [
            {
              plan:
                process.env.STRIPE_PRICE_PLAN ||
                "price_1ObLeAK45umi2LZd5XwwYvam",
            },
          ],
        });
        await userDocRef.update({ stripeSubscriptionId: newSubscription.id });
        const { created, current_period_end, cancel_at_period_end } =
          newSubscription;
        res
          .status(200)
          .json({ created, current_period_end, cancel_at_period_end });
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
    const { created, current_period_end, cancel_at_period_end } = subscription;
    res.status(200).json({ created, current_period_end, cancel_at_period_end });
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
      res.status(200).json(null);
      return;
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

const updateCancelAtPeriodEnd = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const db = admin.firestore();
    const usersCollection = db.collection("users");
    const querySnapshot = await usersCollection
      .where("email", "==", email)
      .get();

    if (!querySnapshot.empty) {
      // User with the provided email found in Firestore
      // Assuming email is unique; if not, you may need additional logic
      const userDoc = querySnapshot.docs[0]; // Get the first document matching the query
      const userData = userDoc.data();

      // Update subscription cancel_at_period_end: false
      const stripe = stripeConf();
      await stripe.subscriptions.update(userData.stripeSubscriptionId, {
        cancel_at_period_end: false,
      });

      return res
        .status(200)
        .json({ message: "Cancallation update successful" });
    } else {
      // User not found in Firestore
      return res.status(404).json({ message: `User not found with ${email}` });
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  startSubscription,
  cancelSubscription,
  getSubscriptionById,
  updateCancelAtPeriodEnd,
};
