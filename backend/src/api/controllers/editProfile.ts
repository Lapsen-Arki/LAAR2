import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const editProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Hae tarvittavat tiedot pyynnöstä (esimerkiksi childName, birthdate, avatar jne.)
    const { childName, birthdate, avatar } = req.body;

    // Tee tarvittavat tietokantaoperaatiot (päivitä käyttäjän profiili tietokantaan)

    // Lähetä vastaus, kun toiminto on suoritettu onnistuneesti
    res.status(200).json({ message: 'Profiili päivitetty onnistuneesti' });
  } catch (error: any) {
    console.error('Profiilin päivitys epäonnistui', error);
    // Lähetä virheilmoitus, jos toiminto epäonnistuu
    res.status(500).json({ error: 'Jotain meni pieleen' });
  }
};

export default editProfile;
