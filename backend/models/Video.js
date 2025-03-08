const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
  channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
});

module.exports = mongoose.model("Video", videoSchema);
