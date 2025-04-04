const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Channel", ChannelSchema);
