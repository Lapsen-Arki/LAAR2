import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import { firestore } from "firebase-admin";
import { getUserIdFromToken } from "../../utils/getUserIdFromTokenUtil";

interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
  creatorId: string; // Käyttäjän UID
}

const getProfiles = async (req: Request, res: Response): Promise<void> => {
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

const getProfileById = async (req: Request, res: Response): Promise<void> => {
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

const deleteProfile = async (req: Request, res: Response): Promise<void> => {
  const profileId = req.params.profileId;

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

    await childProfilesCollection.doc(profileId).delete();

    res
      .status(200)
      .json({ success: true, message: "Profiili poistettu onnistuneesti." });
  } catch (error: any) {
    console.error("Profiilin poisto epäonnistui", error);
    res
      .status(500)
      .json({ success: false, message: "Profiilin poisto epäonnistui." });
  }
};

export { getProfiles, getProfileById, deleteProfile };
