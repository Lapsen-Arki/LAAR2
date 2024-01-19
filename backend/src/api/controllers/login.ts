import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, rememberMe } = req.body as unknown as {
      email: string;
      password: string;
      rememberMe: boolean;
    };

    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);
    params.append("returnSecureToken", "true");

    const firebaseAuthUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`;

    const response = await axios.post(firebaseAuthUrl, params);

    res.status(200).json({
      message: "Login successful",
      data: response.data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Authentication failed",
      error: error.response?.data?.error?.message || error.message,
    });
  }
};

export default loginController;
