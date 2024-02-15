import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { getUserIdFromToken } from "../../../utils/getUserIdFromTokenUtil";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

// Määritellään lapsiprofiilin rakenne
interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
  creatorId: string;
}

// Funktio, joka hakee hoitajien lapsiprofiilit
const getCarerChildProfiles = async (req: Request, res: Response) => {
  try {
    // Haetaan käyttäjän token
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    console.log("Haettu ID token:", idToken);

    if (!idToken) {
      console.log("Token puuttuu");
      return res.status(401).json({ error: "Token puuttuu" });
    }

    // Tarkistetaan käyttäjän UID tokenista
    const receiverUid = await getUserIdFromToken(idToken);
    console.log("Käyttäjän UID:", receiverUid);

    if (!receiverUid) {
      console.log("Virheellinen token");
      return res.status(403).json({ error: "Virheellinen token" });
    }

    const db = admin.firestore();
    let carerChildProfiles: ChildProfile[] = [];

    // Etsitään dokumentit, joissa käyttäjä on määritelty hoitajaksi
    console.log("Etsitään hoitajaprofiileja receiverUid:", receiverUid);
    const childCarersDoc = await db.collection('childCarers')
      .where('receiverUid', '==', receiverUid)
      .get();

    if (childCarersDoc.empty) {
      console.log("Hoitajaprofiileja ei löydy");
      return res.status(404).json({ error: "Hoitajaprofiileja ei löydy" });
    }

    // Yksi dokumentti per hoitaja
    const senderUids = childCarersDoc.docs[0].data().senderUid;
    console.log("Löydetyt senderUids:", senderUids);

    // Etsitään kaikki lapsiprofiilit, jotka on luotu kutsujien toimesta ja joihin on pääsy
    for (const senderUid of senderUids) {
      console.log("Etsitään lapsiprofiileja senderUid:", senderUid);
      const childProfilesSnapshot = await db.collection('childProfile')
        .where('creatorId', '==', senderUid)
        .where('accessRights', '==', true)
        .get();

      childProfilesSnapshot.forEach((childDoc: QueryDocumentSnapshot<ChildProfile>) => {
        const childData = childDoc.data();
        console.log("Löydetty lapsiprofiili:", childData);
        carerChildProfiles.push({ ...childData, id: childDoc.id, creatorId: senderUid });
      });
    }

    console.log("Lähetetään carerChildProfiles:", carerChildProfiles);
    return res.status(200).json({ carerChildProfiles });
  } catch (error) {
    console.error("Virhe hoidettavien lapsiprofiilien haussa: ", error);
    return res.status(500).json({ error: "Palvelinvirhe" });
  }
};

export { getCarerChildProfiles };