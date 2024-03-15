import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";

const createChildProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { childName, birthdate, avatar, accessRights, allergies } = req.body;
    const creatorId = (res as any).userId; // middleware asettaa userId:n res-objektiin
    //("Creator UID:", creatorId);
	const sanitizedAllergies = allergies || null;

    if (!childName || !birthdate || !avatar || accessRights === undefined) {
      res
        .status(400)
        .json({ error: "Kaikki tarvittavat tiedot eivät ole saatavilla" });
      return;
    }

    if (!creatorId) {
      res.status(403).json({ error: "Virheellinen tai puuttuva käyttäjän ID" });
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
	  allergies: sanitizedAllergies
    });

    res.status(200).json({
      message: "Uusi profiili luotu onnistuneesti",
      id: newProfileRef.id,
    });
  } catch (error: any) {
    console.error("Profiilin luonti epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export default createChildProfile;
