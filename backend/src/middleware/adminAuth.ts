import { Request, Response, NextFunction } from "express";
import admin from "../config/firebseConfig";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: Configure and enable type checking
    const userId = (res as any).userId;

    const db = admin.firestore();
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      res.status(401);
      return;
    }

    const isAdmin = userDoc.data().admin;
    if (!isAdmin) {
      return res
        .status(400)
        .send("Et ole admin käyttäjä | You are not admin user");
    }
    if (isAdmin === true) {
      next();
    }
  } catch (error) {
    console.error("Virhe todentamisessa.", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export default adminAuth;
