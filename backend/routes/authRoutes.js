const express = require("express");
const { registerUser, loginUser, getProfile, logoutUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);  // ✅ Ensure this is `/auth/profile`
router.post("/logout", logoutUser);

module.exports = router;
