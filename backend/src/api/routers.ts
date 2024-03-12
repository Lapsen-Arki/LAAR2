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
  updateCancelAtPeriodEnd,
} from "./controllers/stripe";

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

import { editAccount } from "./controllers/accountManagement/editAccount";
import { getAccount } from "./controllers/accountManagement/getAccount";
import { deleteAccount } from "./controllers/accountManagement/deleteAccount";
import { updateCard } from "./controllers/accountManagement/updateCard";
// test controllers:

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

// Account settings routes:
router.get("/get-account-settings", checkAuth, getAccount);
router.post("/post-account-settings", checkAuth, editAccount);
router.post("/delete-account", checkAuth, deleteAccount);
router.post("/update-card", checkAuth, updateCard);
// router.get("/deleteAccount/:accountId", deleteAccount);

// Stripe routes
router.post("/start-subscription", checkAuth, startSubscription);
router.post("/cancel-subscription", checkAuth, cancelSubscription);
router.post("/get-subscription", checkAuth, getSubscriptionById);
router.post("/update-cancellation", checkAuth, updateCancelAtPeriodEnd); //Updating the subscription to NOT cancel when email has been verified

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
