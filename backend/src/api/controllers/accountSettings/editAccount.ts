import { Request, Response } from "express";
import admin from "../../../config/firebseConfig";
class APIError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

export const editAccount = async (req: Request, res: Response) => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) throw new APIError("Token missing", "token-missing");
    const auth = admin.auth().verifyIdToken(idToken);

    throw new APIError(idToken, "not-implemented");
    return res.status(200).json({ message: "Ok!" });
  } catch (error) {
    if (error instanceof APIError) {
      return res.status(500).json({ message: error.message, code: error.code });
    }
  }
};
