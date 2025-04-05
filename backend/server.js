import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true, // send cookies
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

app.use("/api/auth", authRoutes);

app.get("/api/profile", (req, res) => {
  if (req.session.user) {
    return res.json({ user: req.session.user });
  } else {
    return res.status(401).json({ error: "Not authenticated" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
