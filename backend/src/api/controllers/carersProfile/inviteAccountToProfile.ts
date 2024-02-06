import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { getUserIdFromToken } from "../../../utils/getUserIdFromTokenUtil";

const inviteAccountToProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { accountEmail } = req.body;

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

    // Tarkista, onko käyttäjä olemassa "users" -kokoelmassa
    const invitedUserQuery = await usersCollection
      .where("email", "==", accountEmail)
      .get();

    if (invitedUserQuery.empty) {
      res.status(404).json({ error: "Kutsuttava käyttäjä ei ole olemassa" });
      return;
    }

    // Oletetaan, että sähköposti on uniikki, joten otetaan ensimmäinen tulos
    const invitedUserDoc = invitedUserQuery.docs[0];
    const invitedUserUid = invitedUserDoc.id; // Käyttäjän UID

    // Tarkista, onko käyttäjä jo kutsumassa profiileihin
    const existingCarerQuery = await childCarersCollection
      .where("invitedUserUid", "==", invitedUserUid)
      .get();

    if (existingCarerQuery.empty) {
      // Luo uusi hoitaja-profiili käyttäen käyttäjän UID:tä
      const newCarerRef = await childCarersCollection.add({
        invitedUserUid: invitedUserUid, // Käytä saatuja UID-tietoja
        sharedAccountUid: [inviterId],
      });

      res.status(200).json({
        message: "Kutsuttu käyttäjä lisätty hoitajaksi",
        id: newCarerRef.id,
      });
    } else {
      // Päivitä olemassa oleva hoitajaprofiili
      const existingCarer = existingCarerQuery.docs[0];
      const carerId = existingCarer.id;
      const carerData = existingCarer.data();
      const sharedAccounts = carerData.sharedAccountUid || [];
      if (!sharedAccounts.includes(inviterId)) {
        sharedAccounts.push(inviterId);
      }

      await childCarersCollection.doc(carerId).update({
        sharedAccountUid: sharedAccounts,
      });

      res.status(200).json({ message: "Kutsuttu käyttäjä lisätty hoitajaksi" });
    }
  } catch (error: any) {
    console.error("Kutsun luonti epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export default inviteAccountToProfile;