import admin from "firebase-admin";
import { Request, Response } from "express";
import stripeConf from "../../config/stripeClient";

export default async function emailVerification(req: Request, res: Response) {
  const { email, verificationCode } = req.body; // Assuming you're sending the code in the request body

  try {
    // 1. Check if the code matches the one in Firestore
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
      if (userData.emailVerified) {
        return res.status(400).json({ message: "Email is already verified" });
      }

      if (userData.verificationCode === verificationCode) {
        // 2. Check if the code is not expired

        // 3. Update Firestore to set emailVerified to true
        await usersCollection.doc(userDoc.id).update({ emailVerified: true });

        // Update subscription cancel_at_period_end: false
        const stripe = stripeConf();
        await stripe.subscriptions.update(userData.stripeSubscriptionId, {
          cancel_at_period_end: false,
        });

        return res
          .status(200)
          .json({ message: "Email verification successful" });
      } else {
        return res.status(400).json({ message: "Invalid verification code" });
      }
    } else {
      // User not found in Firestore
      console.log(`User not found in Firestore with email: ${email}`);
      return res.status(404).json({ message: `User not found with ${email}` });
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
