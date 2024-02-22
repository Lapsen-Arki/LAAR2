import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { firestore } from "firebase-admin";
import { getUserIdFromToken } from "../../../utils/getUserIdFromTokenUtil";

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

    profileData.id = profileDoc.id;

    res.status(200).json(profileData);
  } catch (error: any) {
    console.error("Profiilin hakeminen epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export { getChildProfileById };
