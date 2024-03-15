import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import stripeConf from "../../../config/stripeClient";
const stripe = stripeConf();
const settingsDataDummy: {
  [key: string]: {
    title: string;
    type: string;
    autocomplete: string;
    value: string;
  };
} = {
  name: {
    title: "Name",
    type: "text",
    autocomplete: "name",
    value: "John Doe",
  },
  email: {
    title: "Email",
    type: "email",
    autocomplete: "email",
    value: "john.doe@example.com",
  },
};
export const getAccount = async (req: Request, res: Response) => {
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
    const customer = await stripe.customers.retrieve(stripeCustomerId);
    if (customer.deleted) throw new Error("Customer not found");
    let defaultPaymentMethodId: string;
    if (
      customer.invoice_settings.default_payment_method === null &&
      typeof customer.default_source === "string"
    )
      defaultPaymentMethodId = customer.default_source;
    else if (
      customer.invoice_settings.default_payment_method !== null &&
      typeof customer.invoice_settings.default_payment_method === "string"
    )
      defaultPaymentMethodId = customer.invoice_settings.default_payment_method;

    const paymentMethods = await stripe.paymentMethods.list({
      customer: stripeCustomerId,
      type: "card",
    });
    // Send sanitized details for security reasons
    const sanitizedPaymentMethods = paymentMethods.data.map((method) => ({
      id: method.id,
      brand: method.card?.brand,
      last4: method.card?.last4,
      expMonth: method.card?.exp_month,
      expYear: method.card?.exp_year,
      isDefault: method.id === defaultPaymentMethodId,
    }));

    return res.status(200).json(sanitizedPaymentMethods);
  } catch (error) {
    console.error("Error getting account:", error);
    res.status(500).json({ error: "Error getting account" });
  }
};
