import { Request, Response } from "express";
import admin from "../../config/firebseConfig";

export default async function getRecommData(req: Request, res: Response) {
  try {
    const fetchType = req.params.fetchType;

    const db = admin.firestore();
    const recommCollection = db.collection("remmendations");
    const recommData = recommCollection.doc(fetchType).get();
  } catch {}
}
