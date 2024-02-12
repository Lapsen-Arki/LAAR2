import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { getUserIdFromToken } from "../../../utils/getUserIdFromTokenUtil";

interface CarerProfile {
    id: string;
    email: string;
    name: string;
  }  

  const deleteCarerProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const idToken = req.headers.authorization?.split("Bearer ")[1];
      if (!idToken) {
        console.error("Token puuttuu");
        res.status(401).json({ error: "Token puuttuu" });
        return;
      }
  
      const removerId = await getUserIdFromToken(idToken);
      if (!removerId) {
        console.error("Virheellinen token");
        res.status(403).json({ error: "Virheellinen token" });
        return;
      }
  
      const { carerId, carerToRemoveId } = req.body;
  
      if (!carerId || !carerToRemoveId) {
        console.error("Tarvittavat tiedot puuttuvat");
        res.status(400).json({ error: "Tarvittavat tiedot puuttuvat" });
        return;
      }
  
      const db = admin.firestore();
      const childCarersCollection = db.collection("childCarers");
  
      const carerDoc = await childCarersCollection.doc(carerId).get();
      if (!carerDoc.exists) {
        console.error("Hoitajaa ei löydy");
        res.status(404).json({ error: "Hoitajaa ei löydy" });
        return;
      }
  
      const carerData = carerDoc.data();
      const senderUids: string[] = carerData?.senderUid || [];
  
      // Poista hoitajan oikeus
      const updatedSenderUids = senderUids.filter(uid => uid !== carerToRemoveId);
  
      await childCarersCollection.doc(carerId).update({
        senderUid: updatedSenderUids,
      });
  
      res.status(200).json({ message: "Hoitajan oikeudet poistettu onnistuneesti" });
    } catch (error: any) {
      console.error("Hoitajan oikeuksien poisto epäonnistui", error);
      res.status(500).json({ error: "Jotain meni pieleen" });
    }
  };
  
  export { deleteCarerProfile };  