const express = require("express");
const { createChannel, deleteChannel } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/channel", protect, createChannel);
router.delete("/channel/:id", protect, deleteChannel);

module.exports = router;
