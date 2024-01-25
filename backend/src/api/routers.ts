// DEFINING ROUTING LOGIC OF THE APPLICATION
import express from "express";
import registerUser from "./controllers/register/register";
import editProfile from "./controllers/editProfile";
import adminPage from "./controllers/adminPage";
import profiles from "./controllers/profiles";
import checkAuth from "./controllers/checkAuth";
import { emailTest } from "./controllers/register/sendEmail";

const router = express.Router();

// Define your routes
router.post("/register", registerUser);

router.post("/auth", checkAuth);

router.post("/editProfile", editProfile);

router.post("/admin", adminPage);

router.post("/email-test", emailTest);

router.get("/profiles", profiles);
// alive check
router.get("/alive", (req, res) => {
  res.status(200);
  res.send("alive");
});

export default router;
