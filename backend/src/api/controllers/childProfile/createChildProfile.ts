import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { getUserIdFromToken } from "../../../utils/getUserIdFromTokenUtil";

const createChildProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { childName, birthdate, avatar, accessRights } = req.body;

    if (!childName || !birthdate || !avatar || accessRights === undefined) {
      res
        .status(400)
        .json({ error: "Kaikki tarvittavat tiedot eivät ole saatavilla" });
      return;
    }

    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      res.status(401).json({ error: "Token puuttuu" });
      return;
    }

    const creatorId = await getUserIdFromToken(idToken);
    if (!creatorId) {
      res.status(403).json({ error: "Virheellinen token" });
      return;
    }

    const db = admin.firestore();
    const childProfilesCollection = db.collection("childProfile");

    // Luo uusi profiili
    const newProfileRef = await childProfilesCollection.add({
      childName: childName,
      birthdate: birthdate,
      avatar: avatar,
      accessRights: accessRights,
      creatorId: creatorId, // Käyttäjän UID
    });

    res.status(200).json({ message: "Uusi profiili luotu onnistuneesti", id: newProfileRef.id });
  } catch (error: any) {
    console.error("Profiilin luonti epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export default createChildProfile;