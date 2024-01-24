import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import { firestore } from 'firebase-admin';

interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
}

const getProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = admin.firestore();
    const childProfilesCollection = db.collection("childProfile");

    const profilesSnapshot = await childProfilesCollection.get();

    const profiles: ChildProfile[] = [];

    profilesSnapshot.forEach((doc: firestore.DocumentSnapshot) => {
      const profileData = doc.data() as ChildProfile;
      profileData.id = doc.id;
      profiles.push(profileData);
    });

    res.status(200).json(profiles);
  } catch (error: any) {
    console.error('Profiilien hakeminen epäonnistui', error);
    res.status(500).json({ error: 'Jotain meni pieleen' });
  }
};

const getProfileById = async (req: Request, res: Response): Promise<void> => {
  const profileId = req.params.id;

  try {
    const db = admin.firestore();
    const childProfilesCollection = db.collection("childProfile");

    const profileDoc = await childProfilesCollection.doc(profileId).get();

    if (!profileDoc.exists) {
      res.status(404).json({ error: 'Profiilia ei löydy' });
      return;
    }

    const profileData = profileDoc.data() as ChildProfile;
    profileData.id = profileDoc.id;

    res.status(200).json(profileData);
  } catch (error: any) {
    console.error('Profiilin hakeminen epäonnistui', error);
    res.status(500).json({ error: 'Jotain meni pieleen' });
  }
};


const deleteProfile = async (req: Request, res: Response): Promise<void> => {
  const profileId = req.params.profileId;

  try {
    const db = admin.firestore();
    const childProfilesCollection = db.collection("childProfile");

    await childProfilesCollection.doc(profileId).delete();

    res.status(200).json({ success: true, message: 'Profiili poistettu onnistuneesti.' });
  } catch (error: any) {
    console.error('Profiilin poisto epäonnistui', error);
    res.status(500).json({ success: false, message: 'Profiilin poisto epäonnistui.' });
  }
};

export { getProfiles, getProfileById, deleteProfile };