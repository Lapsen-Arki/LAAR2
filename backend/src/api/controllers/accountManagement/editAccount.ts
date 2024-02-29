import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import stripeConf from "../../../config/stripeClient";
class APIError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

const stripe = stripeConf();

type StripeToken = {
  id: string;
};

type EditRequestDataType = {
  paymentMethod: { set: boolean; value: StripeToken };
  [key: string]: { set: boolean; value: string | StripeToken };
};
type EditDataType = {
  [key: string]: string;
};

type PaymentResult = { message: string; code: string };

export const editAccount = async (req: Request, res: Response) => {
  try {
    const db = admin.firestore();
    const userId = (res as any).userId;

    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      throw new APIError("User not found", "user-not-found");
    }

    const requestData = req.body as EditRequestDataType;

    if (requestData.paymentMethod.set) {
      const updatePaymentResult: PaymentResult = await updatePaymentMethod(
        userDoc,
        requestData
      );
      if (updatePaymentResult.code !== "success")
        throw new APIError(
          updatePaymentResult.message,
          updatePaymentResult.code
        );
    }
    const dataToUpdate = await filterUpdateData(requestData);
    if (Object.keys(dataToUpdate).length === 0)
      throw new APIError("No data to update", "no-data-to-update");

    // Update the user document
    await userDocRef.update(dataToUpdate);
    return res.status(200).json({ message: userId, status: true });
  } catch (error) {
    if (error instanceof APIError) {
      return res.status(500).json({ message: error.message, code: error.code });
    }
  }
};

function filterUpdateData(data: EditRequestDataType) {
  const filteredData: EditDataType = {};
  // You can map frontend keys that differ from the database keys here.
  // For example, if the frontend sends "displayName" but the database expects "name", you can map it here.
  // frontendKey: databaseKey
  const keyMapping: EditDataType = {
    displayName: "name",
  };
  // Loop through the request data
  for (const key in data) {
    const value = data[key].value;
    if (data[key].set) {
      if (typeof value === "string") {
        // Use mapping if defined, otherwise use original key
        const firebaseKey = keyMapping[key] || key;
        // Assign the value to the filteredData object
        filteredData[firebaseKey] = value;
      }
    }
  }
  // Return the filtered data.
  return filteredData;
}

async function updatePaymentMethod(
  userDoc: any,
  requestData: EditRequestDataType
) {
  try {
    const token = requestData.paymentMethod.value;
    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: token.id,
      },
    });

    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: stripeCustomerId,
    });

    await stripe.customers.update(
      stripeCustomerId,
      {
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      } // Or the ID of an existing card
    );

    return { message: "Payment method updated", code: "success" };
  } catch (error) {
    console.error(error);
    return {
      message: "Error updating payment method",
      code: "payment-method-error",
    };
  }
}
