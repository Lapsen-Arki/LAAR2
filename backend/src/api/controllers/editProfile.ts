import { Request, Response } from "express";
import admin from "../../config/firebseConfig";

const editProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { childName, birthdate, avatar, accessRights } = req.body;

    if (!childName || !birthdate || !avatar || accessRights === undefined) {
      res.status(400).json({ error: 'Kaikki tarvittavat tiedot eivät ole saatavilla' });
      return;
    }

    const db = admin.firestore();
    const childProfilesCollection = db.collection("childProfile");

    // Tarkista, onko käyttäjäprofiili jo olemassa (voit muokata tätä osaa tarvittaessa)
    const existingProfile = await childProfilesCollection.where('childName', '==', childName).get();

    if (existingProfile.empty) {
      // Luo uusi profiili, jos sitä ei ole vielä olemassa
      await childProfilesCollection.add({
        childName: childName,
        birthdate: birthdate,
        avatar: avatar,
        accessRights: accessRights,
      });
    } else {
      // Päivitä olemassa olevaa profiilia (voit mukauttaa päivitystä tarpeen mukaan)
      existingProfile.docs[0].ref.update({
        birthdate: birthdate,
        avatar: avatar,
        accessRights: accessRights,
      });
    }

    res.status(200).json({ message: 'Profiili päivitetty onnistuneesti' });
  } catch (error: any) {
    console.error('Profiilin päivitys epäonnistui', error);
    res.status(500).json({ error: 'Jotain meni pieleen' });
  }
};

export default editProfile;
