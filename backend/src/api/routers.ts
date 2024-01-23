// DEFINING ROUTING LOGIC OF THE APPLICATION
import express from "express";
import registerUser from "./controllers/register";
import loginController from "./controllers/login";
import editProfile from "./controllers/editProfile";
import profiles from "./controllers/profiles";

const router = express.Router();

// Define your routes
router.post("/register", registerUser);

router.post("/login", loginController);

router.post("/editProfile", editProfile);

router.get("/profiles", profiles);

export default router;
