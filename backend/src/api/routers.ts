// DEFINING ROUTING LOGIC OF THE APPLICATION
import express from "express";
import { Request, Response } from "express";
import registerUser from "./controllers/register/register";
import adminAddData from "./controllers/adminAddData";
import checkAuth from "../middleware/checkAuth";
import { emailTest } from "./controllers/testingEmail";
import adminAuth from "../middleware/adminAuth";
import createProfile from "./controllers/editProfile";
import editProfile from "./controllers/editProfile";
import {
  getProfiles,
  getProfileById,
  deleteProfile,
} from "./controllers/profiles";
import emailVerification from "./controllers/emailVerification";

const router = express.Router();

router.post("/register", registerUser);
router.post("/auth", checkAuth, (req: Request, res: Response) => {
  res.status(200).json({ message: "Success" });
});

router.post("/admin", checkAuth, adminAuth, adminAddData);

// Profile routes:
router.post("/editProfile", createProfile);
router.post("/editProfile/:id", editProfile);
router.get("/profiles", getProfiles);
router.get("/profiles/:id", getProfileById);
router.delete("/profiles/:profileId", deleteProfile);

// Email related routes, forgot pw, new verification etc:
router.post("/email-test", emailTest);
router.post("/emailVerification", emailVerification);

// alive check
router.get("/alive", (req, res) => {
  res.status(200);
  res.send("alive");
});

// for testing purposes, remove later
router.get("/secret", (req, res) => {
  res.status(200);
  res.send(process.env.SECRET_IS_SET);
});

export default router;
