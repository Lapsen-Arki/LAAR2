import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import stripeConf from "../../../config/stripeClient";

// Määritellään lapsiprofiilin rakenne
interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
  creatorId: string;
}

// Laajennetaan ChildProfile-rajapintaa sisältämään huoltajan tiedot
interface ExtendedChildProfile extends ChildProfile {
  creatorName: string;
  creatorEmail: string;
}

const getCarerChildProfiles = async (req: Request, res: Response) => {
  try {
    // Tarkista ensin käyttäjän todennus ja hae userId
    const receiverUid = (res as any).userId; // Käytetään tallennettua UID:ta

    const db = admin.firestore();
    let carerChildProfiles: ExtendedChildProfile[] = [];

    const childCarersDoc = await db
      .collection("childCarers")
      .where("receiverUid", "==", receiverUid)
      .get();

    if (childCarersDoc.empty) {
      return res.status(204).json({ error: "Hoitajaprofiileja ei löydy" });
    }

    const senderUids = childCarersDoc.docs[0].data().senderUid;

    for (const senderUid of senderUids) {
      // Checking that creatorId / senderUid has subscribed the service
      const stripe = stripeConf();
      const senderDocRef = db.collection("users").doc(senderUid);
      const senderUserDoc = await senderDocRef.get();
      if (!senderUserDoc.exists) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const stripeSubscriptionId = senderUserDoc.data()?.stripeSubscriptionId;

      if (stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(
          stripeSubscriptionId
        );
        if (subscription.status === "canceled") {
          // Moving to next iteration if sender have not subscribed the service
          continue;
        }
      }

      const childProfilesSnapshot = await db
        .collection("childProfile")
        .where("creatorId", "==", senderUid)
        .where("accessRights", "==", true)
        .get();

      for (const childDoc of childProfilesSnapshot.docs) {
        const childData = childDoc.data() as ChildProfile;
        // Hae huoltajan tiedot users-kokoelmasta
        const creatorDoc = await db.collection("users").doc(senderUid).get();
        if (creatorDoc.exists) {
          const creatorData = creatorDoc.data();
          carerChildProfiles.push({
            ...childData,
            id: childDoc.id,
            creatorId: senderUid,
            creatorName: creatorData?.name || "Nimetön",
            creatorEmail: creatorData?.email || "Ei sähköpostia",
          });
        }
      }
    }

    return res.status(200).json({ carerChildProfiles });
  } catch (error) {
    console.error("Virhe hoidettavien lapsiprofiilien haussa: ", error);
    return res.status(500).json({ error: "Palvelinvirhe" });
  }
};

export { getCarerChildProfiles };
