require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const channelRoutes = require("./routes/channelRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Secure CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies & authentication headers
  })
);
console.log("JWT_SECRET in backend:", process.env.JWT_SECRET);

// Middleware
app.use(express.json()); // Body parser

// ✅ Database Connection with Error Handling
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
