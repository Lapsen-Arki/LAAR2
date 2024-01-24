// checkAuth.ts

import { Request, Response, NextFunction } from "express";
import admin from "../../config/firebseConfig";

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

    res.status(200).json({ message: "Autentikaatio onnistui" }); // Testaukseen

    // Käyttäjä on kirjautunut sisään, voit siirtyä seuraavaan middlewareen tai käyttäjän reittiin
    // next();
  } catch (error: any) {
    console.error("Virhe tarkistaessa kirjautumista", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export default checkAuth;
