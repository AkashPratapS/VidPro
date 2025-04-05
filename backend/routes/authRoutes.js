const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // ✅ Ensure this model exists

const router = express.Router();

// ✅ User Registration (Signup)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // ✅ Save new user to DB
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, "your_secret_key", { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

module.exports = router;
