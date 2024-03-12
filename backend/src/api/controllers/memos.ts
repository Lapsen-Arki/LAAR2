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
      //ei kayttajaa, heita error
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
  } catch (error) {}
};

const getMemos = async (req: Request, res: Response): Promise<void> => {
  const db = admin.firestore();

  const userId = (res as any).userId;

  const userDocRef = db.collection("users").doc(userId);
  const userDoc = await userDocRef.get();

  if (!userDoc) {
    //ei kayttajaa, heita error
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
};

export { saveMemo, getMemos };
