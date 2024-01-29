import { Request, Response } from "express";
import admin from "../../config/firebseConfig";

const adminAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.body;

    const db = admin.firestore();
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      res.status(401);
      return;
    }

    const isAdmin = userDoc.data().admin;
    if (!isAdmin) {
      res.status(401);
    }
    if (admin === true) {
      res.status(200).json({ message: "Success" });
    }
  } catch (error) {
    console.error("Virhe todentamisessa.", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export default adminAuth;
