import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { firestore } from "firebase-admin";

interface CareProfile {
  id: string;
  email: string;
  // Lisää muita tarvittavia kenttiä
}

const getCaresProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const sharedAccountId = req.query.sharedAccountId as string;

    if (!sharedAccountId) {
      res.status(400).json({ error: "sharedAccountId puuttuu" });
      return;
    }

    const db = admin.firestore();
    const careProfilesCollection = db.collection("careProfiles"); // Oletan, että hoitajaprofiilit tallennetaan "careProfiles"-kokoelmaan
    const profilesSnapshot = await careProfilesCollection
      .where("sharedAccountId", "==", sharedAccountId)
      .get();
    const profiles: CareProfile[] = [];

    profilesSnapshot.forEach((doc: FirebaseFirestore.DocumentSnapshot) => {
      const profileData = doc.data() as CareProfile;
      profileData.id = doc.id;
      profiles.push(profileData);
    });

    res.status(200).json(profiles);
  } catch (error: any) {
    console.error("Hoitajaprofiilien hakeminen epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export { getCaresProfiles };
