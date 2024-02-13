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
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      console.log("Token puuttuu");
      res.status(401).json({ error: "Token puuttuu" });
      return;
    }

    const removerId = await getUserIdFromToken(idToken);
    if (!removerId) {
      console.log("Virheellinen token");
      res.status(403).json({ error: "Virheellinen token" });
      return;
    }

    const carerId = req.body.carerId;
    console.log("Saatu carerId:", carerId);

    if (!carerId) {
      console.log("Tarvittavat tiedot puuttuvat: carerId");
      res.status(400).json({ error: "Tarvittavat tiedot puuttuvat: carerId" });
      return;
    }

    const db = admin.firestore();
    const childCarersCollection = db.collection("childCarers");

    const carerDoc = await childCarersCollection.doc(carerId).get();
    if (!carerDoc.exists) {
      console.log("Hoitajaa ei löydy: ", carerId);
      res.status(404).json({ error: "Hoitajaa ei löydy: " + carerId });
      return;
    }

    const carerData = carerDoc.data() as CarerProfile;
    console.log("Hoitajan data:", carerData);

    const updatedSenderUids = carerData.receiverUid !== removerId
      ? carerData.senderUid.filter(uid => uid !== removerId)
      : [];

    await childCarersCollection.doc(carerId).update({
      senderUid: updatedSenderUids,
    });

    console.log("Hoitajan profiili päivitetty:", updatedSenderUids);

    res.status(200).json({ message: "Hoitajan profiili poistettu onnistuneesti" });
  } catch (error: any) {
    console.error("Hoitajan profiilin poisto epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export { deleteCarerProfile };