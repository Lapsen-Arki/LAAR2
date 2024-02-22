// DEFINING ROUTING LOGIC OF THE APPLICATION
import express from "express";
import { Request, Response } from "express";
import checkAuth from "../middleware/checkAuth";
import adminAuth from "../middleware/adminAuth";

// Controller Imports:
import registerUser from "./controllers/register/register";
import adminAddData from "./controllers/adminAddData";
import getRecommData from "./controllers/getRecommData";
import {
  startSubscription,
  cancelSubscription,
  getSubscriptionById,
} from "./controllers/stripe";
import emailVerification from "./controllers/emailVerification";

// Profile controllers:
import createChildProfile from "./controllers/childProfile/createChildProfile";
import editChildProfile from "./controllers/childProfile/editChildProfile";
import { getChildProfiles } from "./controllers/childProfile/getChildProfiles";
import { getChildProfileById } from "./controllers/childProfile/getChildProfileById";
import { deleteChildProfile } from "./controllers/childProfile/deleteChildProfile";
import inviteAccountToProfile from "./controllers/carersProfile/inviteAccountToProfile";
import { getCarerProfile } from "./controllers/carersProfile/getCarerProfile";
import { deleteCarerProfile } from "./controllers/carersProfile/deleteCarerProfile";
import { getCarerChildProfiles } from "./controllers/carersProfile/getCarerChildProfiles";

import { editAccount } from "./controllers/accountSettings/editAccount";
import { getAccount } from "./controllers/accountSettings/getAccount";
// test controllers:
import { emailTest } from "./controllers/testingEmail";
import testController from "../utils/testController";

const router = express.Router();

// General routes:
router.post("/register", registerUser);
router.post("/auth", checkAuth, (req: Request, res: Response) => {
  res.status(200).json({ message: "Success" });
});
router.post("/admin", checkAuth, adminAuth, adminAddData);
router.get("/getRecommData/:fetchType", getRecommData);

// Profile routes:
router.post("/createChildProfile", checkAuth, createChildProfile); // Luo uusi profiili käyttäjälle
router.post("/editChildProfile/:id", checkAuth, editChildProfile); // Muokkaa käyttäjän luomaa profiilia, profiilin idn perusteella
router.get("/profiles", checkAuth, getChildProfiles); // Hae kaikki käyttäjän luomat profiilit
router.get("/profile/:id", checkAuth, getChildProfileById); // Hae käyttäjän luoma profiili idn perusteella
router.delete("/profile/:profileId", checkAuth, deleteChildProfile); // Poista käyttäjän luoma profiili
router.post("/inviteAccountToProfile", checkAuth, inviteAccountToProfile); // Kutsu käyttäjä hoitajaksi profiileihin
router.get("/carers", checkAuth, getCarerProfile); // Hae hoitaja profiilit
router.delete("/carer/:carerId", checkAuth, deleteCarerProfile); // Poista hoitaja profiili
router.get("/getCarerChildProfiles", checkAuth, getCarerChildProfiles); // Hae hoidettavien lasten profiilit

// Future User routes plan (?):
router.get("/get-account", getAccount);
router.post("/edit-account", editAccount);

// router.get("/deleteAccount/:accountId", deleteAccount);

// Email related routes:
router.post("/email-test", emailTest);
router.post("/emailVerification", emailVerification);

// General test route:
router.get("/test", testController);

// Stripe routes
router.post("/start-subscription", startSubscription);
router.post("/cancel-subscription", cancelSubscription);
router.post("/get-subscription", getSubscriptionById);

// FOR TESTING
// -------------------------------------
router.get("/alive", (req, res) => {
  res.status(200);
  res.send("alive");
});
router.get("/secret", (req, res) => {
  res.status(200);
  res.send(process.env.SECRET_IS_SET);
});
// -------------------------------------

export default router;
