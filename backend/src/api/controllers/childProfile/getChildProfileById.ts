import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { firestore } from "firebase-admin";
import checkAuth from "../../../middleware/checkAuth";

interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
  creatorId: string; // Käyttäjän UID
  allergies: string;
}

const getChildProfileById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const profileId = req.params.id;

  try {
    // Käytä checkAuth-middlewarea tokenien tarkastukseen
    checkAuth(req, res, async () => {
      const creatorId = (res as any).userId; // Hae userId res-objektista

      const db = admin.firestore();
      const childProfilesCollection = db.collection("childProfile");

      // Suorahaku ID:n perusteella
      const profileDoc = await childProfilesCollection.doc(profileId).get();

      if (!profileDoc.exists) {
        res.status(404).json({ error: "Profiilia ei löydy" });
        return;
      }

      const profileData = profileDoc.data() as ChildProfile;

      profileData.id = profileDoc.id;

      res.status(200).json(profileData);
    });
  } catch (error: any) {
    console.error("Profiilin hakeminen epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export { getChildProfileById };
