import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";

interface CarerProfile {
  receiverUid: string;
  email: string;
  name: string;
}

const getCarerProfile = async (req: Request, res: Response): Promise<void> => {
  try {
      const senderUid = (res as any).userId; // middleware asettaa userId:n res-objektiin
      //("Sender UID:", senderUid);

      const db = admin.firestore();
      const childCarersCollection = db.collection("childCarers");
      const usersCollection = db.collection("users");

      const profilesSnapshot = await childCarersCollection
        .where("senderUid", "array-contains", senderUid)
        .get();

      const profiles: CarerProfile[] = [];

      for (const doc of profilesSnapshot.docs) {
        const profileData = doc.data() as { receiverUid: string };
        const receiverUid = profileData.receiverUid;

        const userDoc = await usersCollection.doc(receiverUid).get();

        if (userDoc.exists) {
          const userData = userDoc.data() as { name: string; email: string }; // Vain nimi ja sähköposti tallennetaan
          const userProfile: CarerProfile = {
            receiverUid: userDoc.id,
            email: userData.email,
            name: userData.name,
          };
          profiles.push(userProfile);
        }
      }

      res.status(200).json(profiles);
    
  } catch (error: any) {
    console.error("Hoitajaprofiilien hakeminen epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export { getCarerProfile };