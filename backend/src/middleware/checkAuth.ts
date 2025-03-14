// checkAuth.ts

import { Request, Response, NextFunction } from "express";
import admin from "../config/firebseConfig";

const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const idToken = req.headers.authorization?.substring(7); // Oletetaan, että idToken on lähetetty pyynnön otsakkeena

    if (!idToken) {
      res
        .status(401)
        .json({ error: "Kirjaudu sisään käyttääksesi tätä toimintoa" });
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (!decodedToken.uid) {
      res
        .status(401)
        .json({ error: "Kirjaudu sisään käyttääksesi tätä toimintoa" });
      return;
    }

    const userId = decodedToken.uid;

    // saving id for next middleware:
    // TODO: Configure and enable type checking
    (res as any).userId = userId;

    const db = admin.firestore();
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      res
        .status(401)
        .json({ error: "Kirjaudu sisään käyttääksesi tätä toimintoa" });
      return;
    }

    // Käyttäjä on kirjautunut sisään, voit siirtyä seuraavaan middlewareen tai käyttäjän reittiin:
    next();
  } catch (error: any) {
    console.error("Virhe tarkistaessa kirjautumista", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export default checkAuth;
