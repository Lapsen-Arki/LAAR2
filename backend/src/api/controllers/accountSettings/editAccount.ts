import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
class APIError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

export const editAccount = async (req: Request, res: Response) => {
  try {
    const db = admin.firestore();
    const userId = (res as any).userId;

    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      throw new APIError("User not found", "user-not-found");
    }
    console.log(userId);
    return res.status(200).json({ message: userId });
  } catch (error) {
    if (error instanceof APIError) {
      return res.status(500).json({ message: error.message, code: error.code });
    }
  }
};
