const cors = require("cors");
const session = require("express-session");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ✅ Fix CORS issues when using cookies/sessions
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true, // Allow cookies and sessions
  })
);

// ✅ Setup Express Session
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: "lax" },
  })
);

app.use(express.json());

// ✅ Your routes go here
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/vidpro", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)))
  .catch((err) => console.error("❌ Database connection error:", err));
