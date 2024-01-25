// DEFINING ROUTING LOGIC OF THE APPLICATION
import express from "express";
import registerUser from "./controllers/register/register";
import adminPage from "./controllers/adminPage";
import checkAuth from "./controllers/checkAuth";
import { emailTest } from "./controllers/testingEmail";

import createProfile from "./controllers/editProfile";
import editProfile from "./controllers/editProfile";
import {
  getProfiles,
  getProfileById,
  deleteProfile,
} from "./controllers/profiles";

const router = express.Router();

router.post("/register", registerUser);
router.post("/auth", checkAuth);

// Profile routes:
router.post("/editProfile", createProfile);
router.post("/editProfile/:id", editProfile);
router.get("/profiles", getProfiles);
router.get("/profiles/:id", getProfileById);
router.delete("/profiles/:profileId", deleteProfile);

router.post("/admin", adminPage);

router.post("/email-test", emailTest);
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
