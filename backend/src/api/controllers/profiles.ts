import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import { firestore } from 'firebase-admin';

// Määritellään Profile-rajapinta tässä tiedostossa
interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
}

// Näytä kaikki profiilit
const getProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = admin.firestore();
    const childProfilesCollection = db.collection("childProfile");

    const profilesSnapshot = await childProfilesCollection.get();

    const profiles: ChildProfile[] = [];

    profilesSnapshot.forEach((doc: firestore.DocumentSnapshot) => {
      const profileData = doc.data() as ChildProfile;
      profileData.id = doc.id; // Lisätään dokumentin ID profileen
      profiles.push(profileData);
    });

    res.status(200).json(profiles);
  } catch (error: any) {
    console.error('Profiilien hakeminen epäonnistui', error);
    res.status(500).json({ error: 'Jotain meni pieleen' });
  }
};

// Poista profiili
const deleteProfile = async (req: Request, res: Response): Promise<void> => {
  const profileId = req.params.profileId;

  try {
    const db = admin.firestore();
    const childProfilesCollection = db.collection("childProfile");

    // Poista profiili tietokannasta
    await childProfilesCollection.doc(profileId).delete();

    res.status(200).json({ success: true, message: 'Profiili poistettu onnistuneesti.' });
  } catch (error: any) {
    console.error('Profiilin poisto epäonnistui', error);
    res.status(500).json({ success: false, message: 'Profiilin poisto epäonnistui.' });
  }
};

export { getProfiles, deleteProfile };
