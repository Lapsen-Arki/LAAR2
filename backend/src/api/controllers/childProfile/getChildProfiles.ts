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
}

const getChildProfiles = async (req: Request, res: Response): Promise<void> => {
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
    const profilesSnapshot = await childProfilesCollection
      .where("creatorId", "==", creatorId)
      .get();
    const profiles: ChildProfile[] = [];

    profilesSnapshot.forEach((doc: FirebaseFirestore.DocumentSnapshot) => {
      const profileData = doc.data() as ChildProfile;
      profileData.id = doc.id;
      profiles.push(profileData);
    });

    res.status(200).json(profiles);
  } catch (error: any) {
    console.error("Profiilien hakeminen epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export { getChildProfiles };