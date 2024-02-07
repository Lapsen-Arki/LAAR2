// DEFINING ROUTING LOGIC OF THE APPLICATION
import express from "express";
import { Request, Response } from "express";
import registerUser from "./controllers/register/register";
import adminAddData from "./controllers/adminAddData";
import checkAuth from "../middleware/checkAuth";
import { emailTest } from "./controllers/testingEmail";
import adminAuth from "../middleware/adminAuth";
import testController from "../utils/testController";

import createChildProfile from "./controllers/childProfile/createChildProfile";
import editChildProfile from "./controllers/childProfile/editChildProfile";
import { getChildProfiles } from "./controllers/childProfile/getChildProfiles";
import { getChildProfileById } from "./controllers/childProfile/getChildProfileById";
import { deleteChildProfile } from "./controllers/childProfile/deleteChildProfile";
import inviteAccountToProfile from "./controllers/carersProfile/inviteAccountToProfile";
import { getCarerProfile } from "./controllers/carersProfile/getCarerProfile";

import {
  startSubscription,
  cancelSubscription,
  getSubscriptionById
} from './controllers/stripe';
import emailVerification from "./controllers/emailVerification";

const router = express.Router();

router.post("/register", registerUser);
router.post("/auth", checkAuth, (req: Request, res: Response) => {
  res.status(200).json({ message: "Success" });
});

router.post("/admin", checkAuth, adminAuth, adminAddData);

// Profile routes:                                           // Selitteet:
router.post("/createChildProfile", createChildProfile);      // Luo uusi profiili käyttäjälle
router.post("/editChildProfile/:id", editChildProfile);      // Muokkaa käyttäjän luomaa profiilia, profiilin idn perusteella
router.get("/profiles", getChildProfiles);                   // Hae kaikki käyttäjän luomat profiilit
router.get("/profile/:id", getChildProfileById);             // Hae käyttäjän luoma profiili idn perusteella
router.delete("/profile/:profileId", deleteChildProfile);    // Poista käyttäjän luoma profiili

router.post("/inviteAccountToProfile", inviteAccountToProfile); // Kutsu käyttäjä hoitajaksi profiileihin
router.post("/carers", getCarerProfile);                         // Hae hoitaja profiilit

// Future User routes plan (?):
// router.get("/settings", editAccount);
// router.get("/settings/:accountId", deleteAccount);

// Email related routes, forgot pw, new verification etc:
router.post("/email-test", emailTest);
router.post("/emailVerification", emailVerification);

// General test route:
router.get("/test", testController);

// Stripe routes
router.post("/start-subscription/:id", startSubscription)
router.post("/cancel-subscription/:id", cancelSubscription);
router.post("/get-subscription/:id", getSubscriptionById);

// alive check
router.get("/alive", (req, res) => {
  res.status(200);
  res.send("alive");
});

// for testing purposes, remove later
router.get("/secret", (req, res) => {
  res.status(200);
  res.send(process.env.SECRET_IS_SET + " + " + process.env.NODE_ENV);
});

export default router;
