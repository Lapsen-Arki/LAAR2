import { Request, Response } from "express";
import admin from "../../config/firebseConfig";

const editProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, childName, birthdate, avatar, accessRights } = req.body;

    if (!childName || !birthdate || !avatar || accessRights === undefined) {
      res.status(400).json({ error: 'Kaikki tarvittavat tiedot eivät ole saatavilla' });
      return;
    }

    const db = admin.firestore();
    const childProfilesCollection = db.collection("childProfile");

    if (id) {
      // Käyttäjä haluaa päivittää olemassa olevaa profiilia id:n avulla
      const profileRef = childProfilesCollection.doc(id);
      const profileSnapshot = await profileRef.get();

      if (!profileSnapshot.exists) {
        res.status(404).json({ error: 'Profiilia ei löydy' });
        return;
      }

      // Päivitä olemassa olevaa profiilia id:n avulla
      await profileRef.update({
        childName: childName,
        birthdate: birthdate,
        avatar: avatar,
        accessRights: accessRights,
      });

      res.status(200).json({ message: 'Profiili päivitetty onnistuneesti' });
    } else {
      // Luo uusi profiili, jos id ei ole mukana
      await childProfilesCollection.add({
        childName: childName,
        birthdate: birthdate,
        avatar: avatar,
        accessRights: accessRights,
      });

      res.status(200).json({ message: 'Uusi profiili luotu onnistuneesti' });
    }
  } catch (error: any) {
    console.error('Profiilin päivitys epäonnistui', error);
    res.status(500).json({ error: 'Jotain meni pieleen' });
  }
};

export default editProfile;