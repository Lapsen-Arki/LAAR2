import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
import { deleteUser } from "../../../utils/deleteAccountData";
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = (res as any).userId;
    const result = await deleteUser(userId);
    if (!result) throw new Error();
    res.status(200).json({ status: true, message: "Account deleted" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ status: false, message: "Error deleting account" });
  }
};
