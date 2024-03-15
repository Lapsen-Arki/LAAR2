import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";

const editChildProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, childName, birthdate, avatar, accessRights, allergies } = req.body;
    const sanitizedAllergies = allergies || null;
    const creatorId = (res as any).userId; // middleware asettaa userId:n res-objektiin
    

    if (!childName || !birthdate || !avatar || accessRights === undefined) {
      res.status(400).json({ error: "Kaikki tarvittavat tiedot eivät ole saatavilla" });
      return;
    }

    if (!creatorId) {
      res.status(403).json({ error: "Virheellinen tai puuttuva käyttäjän ID" });
      return;
    }

    const db = admin.firestore();
    const childProfilesCollection = db.collection("childProfile");

    if (id) {
      // Käyttäjä päivittää olemassa olevaa profiilia id:n avulla
      const profileRef = childProfilesCollection.doc(id);
      const profileSnapshot = await profileRef.get();

      if (!profileSnapshot.exists) {
        res.status(404).json({ error: "Profiilia ei löydy" });
        return;
      }

      // Päivitä olemassa olevaa profiilia id:n avulla
      await profileRef.update({
        childName,
        birthdate,
        avatar,
        accessRights,
        creatorId, // Käyttäjän UID
        allergies: sanitizedAllergies,
      });

      res.status(200).json({ message: "Profiili päivitetty onnistuneesti" });
    } else {
      res.status(400).json({ error: "Id on pakollinen tieto päivityksessä" });
    }
  } catch (error: any) {
    console.error("Profiilin päivitys epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export default editChildProfile;