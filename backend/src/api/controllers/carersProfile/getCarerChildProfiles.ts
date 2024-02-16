import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import checkAuth from "../../../middleware/checkAuth";

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
    const receiverUid = (res as any).userId; // Käytetään tallennettua UID:ta

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