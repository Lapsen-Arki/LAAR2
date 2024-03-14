import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { firestore } from "firebase-admin";

interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
  creatorId: string; // Käyttäjän UID
}

const deleteChildProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const profileId = req.params.profileId;
  // middleware asettaa userId:n res-objektiin
  const creatorId = (res as any).userId;

  try {
    if (!creatorId) {
      res.status(403).json({ error: "Käyttäjän tunnistaminen epäonnistui" });
      return;
    }

    const db = admin.firestore();
    const childProfilesCollection = db.collection("childProfile");
    const profileDoc = await childProfilesCollection.doc(profileId).get();

    if (!profileDoc.exists) {
      res.status(404).json({ error: "Profiilia ei löydy" });
      return;
    }

    const profileData = profileDoc.data() as ChildProfile;

    // Tarkista, että profiili kuuluu oikealle käyttäjälle käyttäen UID:tä
    if (profileData.creatorId !== creatorId) {
      res.status(403).json({ error: "Ei oikeuksia tähän profiiliin" });
      return;
    }

    await childProfilesCollection.doc(profileId).delete();

    res.status(200).json({ success: true, message: "Profiili poistettu onnistuneesti." });
  } catch (error: any) {
    console.error("Profiilin poisto epäonnistui", error);
    res.status(500).json({ success: false, message: "Profiilin poisto epäonnistui." });
  }
};

export { deleteChildProfile };