const express = require("express");
const { getProfile } = require("../controllers/profileController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Ensure this route exists
router.get("/", authenticate, getProfile);

module.exports = router;
