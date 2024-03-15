import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";

interface CarerProfile {
  receiverUid: string;
  senderUid: string[];
}

const deleteCarerProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const carerId: string | undefined = req.params.carerId;

  try {
    // middleware asettaa userId:n res-objektiin
    const removerId = (res as any).userId;

    if (!removerId) {
      res.status(403).json({ error: "Käyttäjän tunnistaminen epäonnistui" });
      return;
    }

    const db = admin.firestore();
    const carerQuery = await db
      .collection("childCarers")
      .where("receiverUid", "==", carerId)
      .limit(1)
      .get();

    if (carerQuery.empty) {
      res.status(404).json({ error: "Hoitajaprofiilia ei löytynyt." });
      return;
    }

    const doc = carerQuery.docs[0];
    const carerData = doc.data() as CarerProfile;

    if (carerData.senderUid.includes(removerId)) {
      const updatedSenderUids = carerData.senderUid.filter(uid => uid !== removerId);
      await doc.ref.update({ senderUid: updatedSenderUids });
      res.status(200).json({ message: "Hoitajan profiili päivitetty onnistuneesti." });
    } else {
      res.status(403).json({ error: "Ei oikeuksia poistaa tätä hoitajaprofiilia." });
    }
  } catch (error) {
    console.error("Hoitajaprofiilin poisto epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export { deleteCarerProfile };