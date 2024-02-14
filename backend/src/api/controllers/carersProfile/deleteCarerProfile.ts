/*
  Jätetty console.logit kommentteihin jos haluaa tarkastella, miten koodi toimii.
*/


import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { getUserIdFromToken } from "../../../utils/getUserIdFromTokenUtil";

interface CarerProfile {
  receiverUid: string;
  senderUid: string[];
}

const deleteCarerProfile = async (req: Request, res: Response): Promise<void> => {
  const carerId: string | undefined = req.params.carerId;
  //console.log("Saatu carerId:", carerId); // console log

  try {
    const idToken: string | undefined = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      //console.log("Token puuttuu"); // console log
      res.status(401).json({ error: "Token puuttuu" });
      return;
    }

    const removerId: string | null = await getUserIdFromToken(idToken);
    //console.log("removerId:", removerId); // console log
    if (!removerId) {
      //console.log("Virheellinen token"); // console log
      res.status(403).json({ error: "Virheellinen token" });
      return;
    }

    const db = admin.firestore();
    const querySnapshot = await db.collection('childCarers').where('receiverUid', '==', carerId).get();

    if (querySnapshot.empty) {
      //console.log("Hoitajaprofiilia ei löytynyt."); // console log
      res.status(404).json({ error: "Hoitajaprofiilia ei löytynyt." });
      return;
    }

    // Käy läpi löydetyt dokumentit ja poista removerId senderUid-kentästä
    querySnapshot.forEach(async (doc: FirebaseFirestore.DocumentSnapshot) => {
      try {
        //console.log("Dokumentin data:", doc.data()); // console log
        const carerData = doc.data() as CarerProfile;
        //console.log("CarerData:", carerData); // console log
    
        if (carerData.senderUid.includes(removerId)) {
          const updatedSenderUids = carerData.senderUid.filter((uid: string) => uid !== removerId);
          await doc.ref.update({
            senderUid: updatedSenderUids
          });
          //console.log("Hoitajan profiili päivitetty:", updatedSenderUids); // console log
        } else {
          //console.log("Poistaminen ei tarpeen: removerId ei löytynyt senderUidista."); // console log
        }
      } catch (error) {
        console.error("Dokumentin päivitys epäonnistui", error);
      }
    });
    
    res.status(200).json({ message: "Hoitajan profiili päivitetty onnistuneesti." });
  } catch (error) {
    console.error("Hoitajan profiilin päivitys epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export { deleteCarerProfile };
