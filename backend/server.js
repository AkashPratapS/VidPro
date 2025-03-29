require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes"); // Import Auth Routes
const channelRoutes = require("./routes/channelRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ FIX: CORS middleware must specify exact origin
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true // Allow authentication credentials
}));

app.use(express.json()); // Body parser built into Express

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes); // Authentication Routes
app.use("/api/channels", channelRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
