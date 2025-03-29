const express = require("express");
const Channel = require("../models/Channel");
const Video = require("../models/Video");
const router = express.Router();

// Create a Channel
router.post("/create", async (req, res) => {
  try {
    const { name, description, owner } = req.body;
    const newChannel = new Channel({ name, description, owner });
    await newChannel.save();
    res.status(201).json({ message: "Channel created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload a Video
router.post("/upload", async (req, res) => {
  try {
    const { title, url, channel, uploadedBy } = req.body;
    const newVideo = new Video({ title, url, channel, uploadedBy });
    await newVideo.save();
    res.status(201).json({ message: "Video uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Videos for Homepage
router.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find().populate("channel").populate("uploadedBy");
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
