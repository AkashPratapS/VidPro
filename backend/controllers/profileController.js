const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Profile Fetch Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getProfile };
