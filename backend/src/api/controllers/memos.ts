import { Request, Response } from "express";
import admin from "../../config/firebseConfig";
import { Memo } from "../../types/typesBackend"

const saveMemo = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = admin.firestore();

    const userId = (res as any).userId;
    //const newNotes = (req as any).notes;
    console.log("req: ", req.body);
    const { notes } = req.body;

    console.log("id: ", userId);
    console.log("notes: ", notes);

    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc) {
      //ei kayttajaa, heita error
    }
    console.log("notes2: ", notes);
    const memoDocRef = db.collection("memos").doc(userId);
    const memoDoc = await memoDocRef.get();

    if (!memoDoc.exists) {
      console.log("memodocia ei ole");
      await memoDocRef.set({
        notes: req.body,
      });
      console.log("memodocia ei ole, tallennus tehty");
    } else {
      console.log("memodoc on");
      await memoDocRef.set(
        {
          notes: req.body,
        },
        { merge: true }
      );
      console.log("memodoc on, tallennus tehty");
    }
  } catch (error) {}
};

const getMemos = async (req: Request, res: Response): Promise<void> => {
  const db = admin.firestore();

  const userId = (res as any).userId;
  console.log("getmemos aloitettu")

  const userDocRef = db.collection("users").doc(userId);
  const userDoc = await userDocRef.get();

  if (!userDoc) {
    //ei kayttajaa, heita error
  }

  const memoDocRef = db.collection("memos").doc(userId);
  const memoDoc = await memoDocRef.get();

  if (!memoDoc.exists) {
	console.log("ei ollut muistiinpanoja")
    //ei ollut muistiinpanoja
    res.status(200).json([]); // Or you can return an appropriate response
    return;
  }
  console.log("muistiinpanot löytyi!")
  const notes: Memo[] = memoDoc.data()?.notes || [];
  console.log("notes: ", notes)
  res.status(200).json(notes);
};

export { saveMemo, getMemos };
