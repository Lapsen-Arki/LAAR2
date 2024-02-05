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

    //console.log("Tiedot tarkistettu onnistuneesti");

    const db = admin.firestore();
    const childCarersCollection = db.collection("childCarers");
    const usersCollection = db.collection("users");

    // Tarkista, onko käyttäjä olemassa "users" -kokoelmassa
    const invitedUserQuery = await usersCollection
      .where("email", "==", accountEmail)
      .get();

    if (invitedUserQuery.empty) {
      //console.log("Kutsuttava käyttäjä ei ole olemassa");
      res.status(404).json({ error: "Kutsuttava käyttäjä ei ole olemassa" });
      return;
    }

    // Tarkista, onko käyttäjä jo kutsumassa profiileihin
    const existingCarerQuery = await childCarersCollection
      .where("carersAccountId", "==", accountEmail)
      .get();

    if (existingCarerQuery.empty) {
      //console.log("Kutsuttavaa käyttäjää ei löydy hoitajista");

      // Luo uusi hoitaja-profiili
      const newCarerRef = await childCarersCollection.add({
        carersAccountId: accountEmail, // Kutsutun käyttäjän UID
        sharedAccountId: [inviterId], // Kutsujan UID
      });

      res.status(200).json({
        message: "Kutsuttu käyttäjä lisätty hoitajaksi",
        id: newCarerRef.id,
      });
    } else {
      //console.log("Hoitajaprofiili löytyy jo, päivitetään tiedot");

      // Hoitajaprofiili löytyy jo, päivitä sen tiedot lisäämällä kutsujan UID
      const existingCarer = existingCarerQuery.docs[0];
      const carerId = existingCarer.id;
      const carerData = existingCarer.data();
      const sharedAccounts = carerData.sharedAccountId || [];
      if (!sharedAccounts.includes(inviterId)) {
        sharedAccounts.push(inviterId);
      }

      await childCarersCollection.doc(carerId).update({
        sharedAccountId: sharedAccounts,
      });

      res.status(200).json({ message: "Kutsuttu käyttäjä lisätty hoitajaksi" });
    }
  } catch (error: any) {
    console.error("Kutsun luonti epäonnistui", error);
    res.status(500).json({ error: "Jotain meni pieleen" });
  }
};

export default inviteAccountToProfile;