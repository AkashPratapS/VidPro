const express = require("express");
const { deleteVideo, getAllChannels } = require("../controllers/adminController");
const { protect, adminAuth } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/channels", protect, adminAuth, getAllChannels);
router.delete("/video/:id", protect, adminAuth, deleteVideo);

module.exports = router;
