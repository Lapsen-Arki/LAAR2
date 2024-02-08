import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { getUserIdFromToken } from "../../../utils/getUserIdFromTokenUtil";

interface CarerProfile {
  id: string;
  email: string;
  name: string;
}

const getCarerProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      res.status(401).json({ error: "Token puuttuu" });
      return;
    }

    const sharedAccountUid = await getUserIdFromToken(idToken);
    if (!sharedAccountUid) {
      res.status(403).json({ error: "Virheellinen token" });
      return;
    }

    const db = admin.firestore();
    const childCarersCollection = db.collection("childCarers");
    const usersCollection = db.collection("users");

    const profilesSnapshot = await childCarersCollection
      .where("sharedAccountUid", "array-contains", sharedAccountUid)
      .get();

    if (profilesSnapshot.empty) {
      res.status(404).json({ error: "Hoitajaprofiilia ei löydy" });
      return;
    }

    const profiles: CarerProfile[] = [];

    for (const doc of profilesSnapshot.docs) {
      const profileData = doc.data() as { invitedUserUid: string };
      const invitedUserUid = profileData.invitedUserUid;

      const userDoc = await usersCollection.doc(invitedUserUid).get();

      if (userDoc.exists) {
        const userData = userDoc.data() as { name: string; email: string }; // Vain nimi ja sähköposti tallennetaan
        const userProfile: CarerProfile = {
          id: userDoc.id,
          email: userData.email,
          name: userData.name,
        };
        profiles.push(userProfile);
      }
    }

    //console.log("Hoitajaprofiilit noudettu onnistuneesti");

    res.status(200).json(profiles);
  } catch (error: any) {
    console.error("Hoitajaprofiilien hakeminen epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export { getCarerProfile };