import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { getUserIdFromToken } from "../../../utils/getUserIdFromTokenUtil";

interface CarerProfile {
  receiverUid: string;
  senderUid: string[];
}

const deleteCarerProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const carerId: string | undefined = req.params.carerId; // Haetaan hoitajan ID pyynnöstä

  try {
    const idToken: string | undefined =
      req.headers.authorization?.split("Bearer ")[1]; // Haetaan idToken
    if (!idToken) {
      res.status(401).json({ error: "Token puuttuu" });
      return;
    }

    const removerId: string | null = await getUserIdFromToken(idToken); // Haetaan poistajan ID tokenista

    if (!removerId) {
      res.status(403).json({ error: "Virheellinen token" });
      return;
    }

    const db = admin.firestore();
    const carerQuery = await db
      .collection("childCarers")
      .where("receiverUid", "==", carerId)
      .limit(1)
      .get(); // Haetaan hoitajaprofiili receiverUid:n perusteella

    if (carerQuery.empty) {
      res.status(404).json({ error: "Hoitajaprofiilia ei löytynyt." });
      return;
    }

    const doc = carerQuery.docs[0]; // Otetaan ensimmäinen dokumentti

    const carerData = doc.data() as CarerProfile; // Haetaan dokumentin data

    if (carerData.senderUid.includes(removerId)) {
      const updatedSenderUids = carerData.senderUid.filter(
        (uid: string) => uid !== removerId
      ); // Päivitetään senderUid poistamalla poistajan ID
      await doc.ref.update({ senderUid: updatedSenderUids }); // Päivitetään dokumentti tietokantaan
    } else {
    }

    res
      .status(200)
      .json({ message: "Hoitajan profiili päivitetty onnistuneesti." });
  } catch (error) {
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export { deleteCarerProfile };
