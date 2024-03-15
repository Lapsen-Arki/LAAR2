import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import { Memo } from "../../types/typesBackend";

const saveMemo = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = admin.firestore();

    const userId = (res as any).userId;

    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc) {
      res.status(404).json({ error: "Jotain meni vikaan." });
      return;
    }

    const memoDocRef = db.collection("memos").doc(userId);
    const memoDoc = await memoDocRef.get();

    if (!memoDoc.exists) {
      await memoDocRef.set({
        notes: req.body,
      });
    } else {
      await memoDocRef.set(
        {
          notes: req.body,
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.error("Error saving memos: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMemos = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = admin.firestore();

    const userId = (res as any).userId;

    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc) {
      res.status(404).json({ error: "Jotain meni vikaan." });
      return;
    }

    const memoDocRef = db.collection("memos").doc(userId);
    const memoDoc = await memoDocRef.get();

    if (!memoDoc.exists) {
      // Ei ollut muistiinpanoja
      res.status(200).json([]);
      return;
    }
    const notes: Memo[] = memoDoc.data()?.notes || [];
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching memos: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { saveMemo, getMemos };
