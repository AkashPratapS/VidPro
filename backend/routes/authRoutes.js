const express = require("express");
const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Register Route
router.post("/register", registerUser);

// ✅ Login Route
router.post("/login", loginUser);

// ✅ Get Profile Route (Protected)
router.get("/profile", authenticate, getProfile);

module.exports = router;
