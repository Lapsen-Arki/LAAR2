import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import { FinalRecommData } from "../../types/typesBackend";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

export default async function getRecommData(req: Request, res: Response) {
  try {
    const fetchType = req.params.fetchType;

    const db = admin.firestore();
    const recommRef = db
      .collection("recommendations")
      .where("category", "==", fetchType);

    const recommSnapshot = await recommRef.get();

    if (recommSnapshot.empty) {
      res.status(404).json({ error: "Dataa ei löytynyt" });
      return;
    }

    const recommendations: FinalRecommData = recommSnapshot.docs.map(
      (doc: QueryDocumentSnapshot) => doc.data()
    );

    res.status(200).json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
