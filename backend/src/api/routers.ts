// DEFINING ROUTING LOGIC OF THE APPLICATION
import express from "express";
import registerUser from "./controllers/register/register";
import editProfile from "./controllers/editProfile";
import adminPage from "./controllers/adminPage";
import profiles from "./controllers/profiles";
import checkAuth from "./controllers/checkAuth";

const router = express.Router();

// Define your routes
router.post("/register", registerUser);

router.post("/auth", checkAuth);

router.post("/editProfile", editProfile);

router.post("/admin", adminPage);

router.get("/profiles", profiles);
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
