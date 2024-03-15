import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import stripeConf from "../../../config/stripeClient";
const stripe = stripeConf();

type Action = "delete" | "update";
type CardId = string;

export const updateCard = async (req: Request, res: Response) => {
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

    const cardId: CardId = req.body.cardId;
    const action: Action = req.body.action;
    
    if (action === "delete") {
      await stripe.paymentMethods.detach(cardId);
    } else if (action === "update") {
      // Set new default card
      await stripe.customers.update(stripeCustomerId, {
        invoice_settings: {
          default_payment_method: cardId,
        },
      });
    }
    return res.status(200).json({ status: true, message: "Card updated" });
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ status: false, message: "Error updating card" });
  }
};
