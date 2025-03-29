const express = require('express');
const Video = require('../models/Video');
const { authenticate, authorize } = require('../middlewares/auth');
const router = express.Router();

// Upload a new video (User & Admin)
router.post('/', authenticate, async (req, res) => {
  const { title, url } = req.body;
  try {
    const video = new Video({ title, url, owner: req.user.id });
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(400).send('Error uploading video');
  }
});

// Update a video (Owner only)
router.put('/:id', authenticate, async (req, res) => {
  const { title, url } = req.body;
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).send('Video not found');
    if (video.owner.toString() !== req.user.id) return res.status(403).send('Forbidden');
    video.title = title;
    video.url = url;
    await video.save();
    res.json(video);
  } catch (error) {
    res.status(400).send('Error updating video');
  }
});

// Delete a video (Admin only)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).send('Video not found');
    await video.remove();
    res.send('Video deleted successfully');
  } catch (error) {
    res.status(400).send('Error deleting video');
  }
});

module.exports = router;
