import { FrontendRecommData } from "../../types/typesBackend";
import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import { TextContents, recomm } from "../../types/typesBackend";
import { FinalRecommData } from "../../types/typesBackend";
import { FieldValue } from "firebase-admin/firestore";

const adminPage = async (req: Request, res: Response) => {
  try {
    const addDataObject = req.body as unknown as FrontendRecommData;

    const validCategories = ["meal", "activity", "tip"];
    // Validate category:
    if (!validCategories.includes(addDataObject.category)) {
      return res.status(400).send({
        error:
          "Virheellinen kategoria vastaanotettu | Invalid category received",
      });
    }

    // Validate choice
    const validateTextLength = (text: string) => text.length > 30;
    if (validateTextLength(addDataObject.title)) {
      return res
        .status(400)
        .send(
          "Otsikko kenttä ei saa sisältää yli 30 merkkiä. | Title field can not have over 10 letters."
        );
    }
    // Validate name
    if (
      addDataObject.category !== "tip" &&
      validateTextLength(addDataObject.name)
    ) {
      return res
        .status(400)
        .send(
          "Nimi kenttä ei saa sisältää yli 10 merkkiä. | Nimi/name field can not have over 10 letters."
        );
    }
    // Validate image
    if (addDataObject.category !== "tip" && !addDataObject.photoLink) {
      return res
        .status(400)
        .send(
          "Sinulla pitää olla kuvaa varten linkki | You must have either a link or a file for the image"
        );
    }
    if (
      addDataObject.photoLink &&
      !addDataObject.photoLink.startsWith("https://")
    ) {
      return res
        .status(400)
        .send(
          'Linkin pitää alkaa "https://" | Link has to start with "https://"'
        );
    }
    if (!addDataObject.ageLimit) {
      return res
        .status(400)
        .send("Ikäraja pitää olla määritetty | Agelimit has to be defined");
    }

    // Restructuring the data:
    const { textContent, name, title, ageLimit } = addDataObject;

    // Remove whitespace from start and end of title and name:
    const cleanTitle = title.trim();
    const nameKey: string = name.trim();
    const recommValue: number = ageLimit;

    // Set recomm data:
    const recommObj: recomm = {
      [nameKey]: recommValue,
    };

    // Set text content data:
    const textContValue: string = textContent;
    const textContentObj: TextContents = {
      [nameKey]: textContValue,
    };

    const photos = {
      [nameKey]: addDataObject.photoLink,
    };

    const newData: FinalRecommData = {
      category: addDataObject.category,
      type: addDataObject.typeSelect,
      title: cleanTitle,
      recomm: recommObj,
      textContent: textContentObj,
      photos: photos,
      nameKeys: [nameKey],
    };

    // Small delay to prevent timing related issues causing potential duplicates:
    function delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await delay(2000);

    // Saving data to firebase
    const db = admin.firestore();
    const recommCollection = db.collection("recommendations");

    // Check for duplicate titles:
    const titleQuery = await recommCollection
      .where("category", "==", newData.category)
      .where("title", "==", newData.title)
      .where("type", "!=", newData.type)
      .get();

    if (!titleQuery.empty) {
      return res
        .status(400)
        .send(
          `Duplikaatti. Samassa kategoriassa on valmiiksi jo otsikko: ${newData.title} | Duplicate. Within the same category there is already the same title: ${newData.title} `
        );
    }

    // Check for duplicate names:
    const nameQuery = await recommCollection
      .where("category", "==", newData.category)
      .where("nameKeys", "array-contains", nameKey)
      .get();

    if (!nameQuery.empty) {
      return res
        .status(400)
        .send(
          `Duplikaatti. Samassa kategoriassa on valmiiksi jo nimi: ${nameKey} | Duplicate. Within the same category there is already the same name: ${nameKey} `
        );
    }

    let query = await recommCollection
      .where("category", "==", newData.category)
      .where("type", "==", newData.type)
      .where("title", "==", newData.title);

    const querySnapshot = await query.get();

    // If doc exsists only content and phots will be updated
    if (!querySnapshot.empty) {
      // Document exists, updating the document
      const docId = querySnapshot.docs[0].id;

      const updates = {
        [`recomm.${nameKey}`]: recommValue,
        [`textContent.${nameKey}`]: textContValue,
        [`photos.${nameKey}`]: addDataObject.photoLink,
        nameKeys: FieldValue.arrayUnion(newData.nameKeys[0]),
      };

      // Perform the update
      await recommCollection.doc(docId).update(updates);
    } else {
      // No matching document, create a new one
      await recommCollection.add(newData);
    }

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
