import { AddDataToDatabase } from "../../types/types";
import { Request, Response } from "express";
import admin from "../../config/firebseConfig";

const adminPage = async (req: Request, res: Response) => {
  try {
    const addDataObject = req.body as unknown as AddDataToDatabase;
    console.log(addDataObject); // FOR TESTING ONLY

    // TODO: 1. Adding normal authentication here -> chckAuth.ts
    // 2. Adding ADMIN auth here -> adminAuth.ts
    // 3. Continuing normally:

    const validCategories = [
      "aktiviteetti",
      "pieniAteria",
      "isoAteria",
      "iltatoimi",
      "nukkuminen",
    ];
    // Validate category:
    if (!validCategories.includes(addDataObject.category)) {
      return res.status(400).send({
        error:
          "Virheellinen kategoria vastaanotettu | Invalid category received",
      });
    }

    // Validate choice
    const validateTextLength = (text: string) => text.length > 10;
    if (validateTextLength(addDataObject.choice)) {
      return res
        .status(400)
        .send(
          "Valikko kenttä ei saa sisältää yli 10 merkkiä. | Valikko/choice field can not have over 10 letters."
        );
    }
    // Validate name
    if (validateTextLength(addDataObject.name)) {
      return res
        .status(400)
        .send(
          "Nimi kenttä ei saa sisältää yli 10 merkkiä. | Nimi/name field can not have over 10 letters."
        );
    }
    // Validate image
    if (!addDataObject.photoFileName && !addDataObject.photoLink) {
      return res
        .status(400)
        .send(
          "Sinulla pitää olla kuvaa varten joko linkki tai tiedosto | You must have either a link or a file for the image"
        );
    }

    // Saving data to firebase
    const db = admin.firestore();
    const recommendationsCollection = db.collection("recommendations");
    await recommendationsCollection.doc().set(addDataObject);

    res
      .status(201)
      .send(
        `Admin page connection succesful: ${JSON.stringify(addDataObject)}`
      ); // Testing response! Replace with real response.
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export default adminPage;
