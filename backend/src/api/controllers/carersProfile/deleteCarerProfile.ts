import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { getUserIdFromToken } from "../../../utils/getUserIdFromTokenUtil";

interface CarerProfile {
  receiverUid: string;
  email: string;
  name: string;
  senderUid: string[];
}

const deleteCarerProfile = async (req: Request, res: Response): Promise<void> => {
  const carerId: string | undefined = req.params.carerId;
  console.log("Saatu carerId:", carerId);

  try {
    const idToken: string | undefined = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      console.log("Token puuttuu");
      res.status(401).json({ error: "Token puuttuu" });
      return;
    }

    const removerId: string | null = await getUserIdFromToken(idToken);
    if (!removerId) {
      console.log("Virheellinen token");
      res.status(403).json({ error: "Virheellinen token" });
      return;
    }

    if (!carerId) {
      console.log("Tarvittavat tiedot puuttuvat: carerId");
      res.status(400).json({ error: "Tarvittavat tiedot puuttuvat: carerId" });
      return;
    }

    const db = admin.firestore();
    
    // Käytä collectionGroup-metodia kaikkien childCarers-kokoelman alikokoelmien hakuun
    const querySnapshot = await db.collectionGroup('childCarers').where('receiverUid', '==', carerId).get();

    // Käy läpi jokainen dokumentti querySnapshotissa
    querySnapshot.forEach(async (doc: FirebaseFirestore.DocumentSnapshot) => {
      const carerData = doc.data() as CarerProfile;
      console.log("Hoitajan data:", carerData);

      const updatedSenderUids: string[] = carerData.receiverUid !== removerId
        ? carerData.senderUid.filter((uid: string) => uid !== removerId)
        : [];

      await doc.ref.update({
        senderUid: updatedSenderUids,
      });

      console.log("Hoitajan profiili päivitetty:", updatedSenderUids);
    });

    res.status(200).json({ message: "Hoitajan profiili poistettu onnistuneesti" });
  } catch (error: any) {
    console.error("Hoitajan profiilin poisto epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export { deleteCarerProfile };