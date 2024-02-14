import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { getUserIdFromToken } from "../../../utils/getUserIdFromTokenUtil";
import { DocumentSnapshot } from "firebase-admin/firestore";

const inviteAccountToProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const accountEmail = req.body.accountEmail;

    if (!accountEmail) {
      console.error("Tarvittavat tiedot puuttuvat");
      res.status(400).json({ error: "Tarvittavat tiedot puuttuvat" });
      return;
    }

    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      console.error("Token puuttuu");
      res.status(401).json({ error: "Token puuttuu" });
      return;
    }

    const inviterId = await getUserIdFromToken(idToken);
    if (!inviterId) {
      console.error("Virheellinen token");
      res.status(403).json({ error: "Virheellinen token" });
      return;
    }

    const db = admin.firestore();
    const childCarersCollection = db.collection("childCarers");
    const usersCollection = db.collection("users");

    const invitedUserQuery = await usersCollection
      .where("email", "==", accountEmail)
      .get();

    if (invitedUserQuery.empty) {
      res.status(404).json({ error: "Kutsuttava käyttäjä ei ole olemassa" });
      return;
    }

    const invitedUserDoc = invitedUserQuery.docs[0];
    const receiverUid = invitedUserDoc.id;

    const existingCarerQuery = await childCarersCollection
      .where("receiverUid", "==", receiverUid)
      .get();

    // Tarkistetaan, onko käyttäjä jo kutsuttu
    let isAlreadyInvited = false;
    existingCarerQuery.forEach((doc: DocumentSnapshot) => {
      const data = doc.data();
      if (data?.senderUid?.includes(inviterId)) {
        isAlreadyInvited = true;
      }
    });

    if (isAlreadyInvited) {
      res.status(409).json({ error: "Käyttäjä on jo kutsuttu" });
      return;
    }

    if (existingCarerQuery.empty) {
      const newCarerRef = await childCarersCollection.add({
        receiverUid: receiverUid,
        senderUid: [inviterId],
      });

      res.status(200).json({
        message: "Kutsuttu käyttäjä lisätty hoitajaksi",
        id: newCarerRef.id,
      });
    } else {
      const existingCarer = existingCarerQuery.docs[0];
      const carerId = existingCarer.id;
      const carerData = existingCarer.data();
      const sharedAccounts = carerData?.senderUid || [];
      sharedAccounts.push(inviterId);

      await childCarersCollection.doc(carerId).update({
        senderUid: sharedAccounts,
      });

      res.status(200).json({ message: "Kutsuttu käyttäjä lisätty hoitajaksi" });
    }
  } catch (error: any) {
    console.error("Kutsun luonti epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export default inviteAccountToProfile;
