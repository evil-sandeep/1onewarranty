// routes/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");
const { signup, login } = require("../controllers/authController"); // your existing controllers

const router = express.Router();

// existing signup/login
router.post("/signup", signup);
router.post("/login", login);

// GET /api/auth/me  => returns the user (safe fields only)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ msg: "No user" });

    const user = await User.findById(userId).select("-password -__v").lean();
    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.json({ user });
  } catch (err) {
    console.error("GET /api/auth/me error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

// Optional: logout route for cookie-based auth
router.post("/logout", (req, res) => {
  // If you use httpOnly cookie for token, clear it
  res.clearCookie(process.env.AUTH_COOKIE_NAME || "token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res.json({ msg: "Logged out" });
});

module.exports = router;
