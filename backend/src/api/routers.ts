// DEFINING ROUTING LOGIC OF THE APPLICATION
import express from "express";
import registerUser from "./controllers/register/register";
import loginController from "./controllers/login";
import editProfile from "./controllers/editProfile";
import adminPage from "./controllers/adminPage";

const router = express.Router();

// Define your routes
router.post("/register", registerUser);

router.post("/login", loginController);

router.post("/editProfile", editProfile);

router.post("/admin", adminPage);

// alive check
router.get("/alive", (req, res) => {
  res.status(200);
  res.send("alive");
});

export default router;
