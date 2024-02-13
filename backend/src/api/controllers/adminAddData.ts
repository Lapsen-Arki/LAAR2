import { FrontendRecommData } from "../../types/typesBackend";
import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import { TipContents, contents } from "../../types/typesBackend";
import { FinalRecommData } from "../../types/typesBackend";

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
      validateTextLength(addDataObject.content)
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

    // Restructuring the data:
    const { title, content, ageLimit } = addDataObject;

    let contentObj: TipContents | contents;
    let contentKey, contentValue;
    if (addDataObject.category !== "tip") {
      contentKey = content;
      contentValue = ageLimit;
      contentObj = {
        [contentKey]: contentValue || 0,
      };
    } else {
      contentKey = title;
      contentValue = content;
      contentObj = {
        [contentKey]: contentValue,
      };
    }

    const photos = {
      [contentKey]: addDataObject.photoLink,
    };

    const newData: FinalRecommData = {
      category: addDataObject.category,
      type: addDataObject.typeSelect,
      title: addDataObject.title,
      content: contentObj,
      photos: photos,
    };

    // Saving data to firebase
    const db = admin.firestore();
    const recommCollection = db.collection("recommendations");

    let query = recommCollection
      .where("category", "==", newData.category)
      .where("type", "==", newData.type)
      .where("title", "==", newData.title);

    const querySnapshot = await query.get();

    // If doc exsists only content and phots will be updated
    if (!querySnapshot.empty) {
      // Document exists, updating the document
      const docId = querySnapshot.docs[0].id;

      const updates = {
        [`content.${contentKey}`]: contentValue,
        [`photos.${contentKey}`]: addDataObject.photoLink,
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
