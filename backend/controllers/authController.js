const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ✅ Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already registered" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Login User (Using Sessions)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "❌ User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "❌ Invalid credentials" });

    // Store user info in session
    req.session.user = { id: user._id, role: user.role };

    res.json({ success: true, message: "✅ Logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get User Profile (Session-Based)
exports.getProfile = async (req, res) => {
  try {
    console.log("Session Data:", req.session); // ✅ Debugging: Check if session exists

    if (!req.session.user) {
      return res.status(401).json({ error: "Unauthorized: Please log in" });
    }

    const user = await User.findById(req.session.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ Logout User (Destroy Session)
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "✅ Logged out successfully" });
  });
};
