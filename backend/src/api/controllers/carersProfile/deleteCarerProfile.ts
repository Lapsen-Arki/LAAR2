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
    
    // Käytä collection-metodia kaikkien childCarers-kokoelman alikokoelmien hakuun
    const querySnapshot = await db.collection('childCarers').where('receiverUid', '==', carerId).get();

    res.status(200).json({ message: "Hoitajan profiili poistettu onnistuneesti" });
  } catch (error: any) {
    console.error("Hoitajan profiilin poisto epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export { deleteCarerProfile };

/*
// Saving data to firebase
    const db = admin.firestore();
    const recommCollection = db.collection("recommendations");

    let query = recommCollection
      .where("category", "==", newData.category)
      .where("type", "==", newData.type)
      .where("title", "==", newData.title);

    const querySnapshot = await query.get();

    if (!querySnapshot.empty) {
*/