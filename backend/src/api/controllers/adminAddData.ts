import { FrontendDataObject } from "../../types/types";
import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import { TipContents, contents } from "../../types/types";

const adminPage = async (req: Request, res: Response) => {
  try {
    const addDataObject = req.body as unknown as FrontendDataObject;

    const validCategories = ["ateria", "aktiviteetti", "vinkki"];
    // Validate category:
    if (!validCategories.includes(addDataObject.category)) {
      return res.status(400).send({
        error:
          "Virheellinen kategoria vastaanotettu | Invalid category received",
      });
    }

    // Validate choice
    const validateTextLength = (text: string) => text.length > 10;
    if (validateTextLength(addDataObject.title)) {
      return res
        .status(400)
        .send(
          "Otsikko kenttä ei saa sisältää yli 10 merkkiä. | Title field can not have over 10 letters."
        );
    }
    // Validate name
    if (
      addDataObject.category !== "vinkki" &&
      validateTextLength(addDataObject.content)
    ) {
      return res
        .status(400)
        .send(
          "Nimi kenttä ei saa sisältää yli 10 merkkiä. | Nimi/name field can not have over 10 letters."
        );
    }
    // Validate image
    if (
      addDataObject.category !== "vinkki" &&
      !addDataObject.photoFileName &&
      !addDataObject.photoLink
    ) {
      return res
        .status(400)
        .send(
          "Sinulla pitää olla kuvaa varten joko linkki tai tiedosto | You must have either a link or a file for the image"
        );
    }

    console.log("printing the addDataObject: ", addDataObject);

    // Restructuring the data:
    const { title, content, ageLimit } = addDataObject;

    let contentObj: TipContents | contents;
    if (addDataObject.category !== "vinkki") {
      contentObj = {
        [content]: ageLimit || 0,
      };
    } else {
      contentObj = {
        [title]: content,
      };
    }

    const photos = {
      [title]: "Photo Path or link",
    };

    const newData = {
      category: addDataObject.category,
      type: addDataObject.typeSelect,
      title: addDataObject.title,
      content: contentObj,
      photos: photos,
    };

    console.log("printing the newData: ", newData);

    // Saving data to firebase
    const db = admin.firestore();
    const recommCollection = db.collection("recommendations");

    let query = recommCollection
      .where("category", "==", newData.category)
      .where("type", "==", newData.type)
      .where("title", "==", newData.title);

    const querySnapshot = await query.get();

    if (!querySnapshot.empty) {
      // Document exists, updating the document
      const docId = querySnapshot.docs[0].id;

      interface Updates {
        [key: `content.${string}`]: string | number;
        [key: `photos.${string}`]: string;
      }
      const updates: Updates = {};

      const newContentKey = Object.keys(contentObj)[0];
      const newContentValue: string | number = contentObj[newContentKey];
      updates[`content.${newContentKey}`] = newContentValue;

      const newPhotoKey = Object.keys(photos)[0];
      const newPhotoValue = photos[newPhotoKey];
      updates[`photos.${newPhotoKey}`] = newPhotoValue;

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
