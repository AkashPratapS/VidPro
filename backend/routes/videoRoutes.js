const express = require("express");
const router = express.Router();
const { addVideo, deleteVideo } = require("../controllers/videoController");
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware, addVideo);
router.delete("/:id", authMiddleware, deleteVideo);

module.exports = router;
