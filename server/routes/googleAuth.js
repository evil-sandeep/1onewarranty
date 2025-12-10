// routes/googleAuth.js
const express = require("express");
const router = express.Router();
const passport = require("../config/passportGoogle"); // ensure this registers the strategy
const jwt = require("jsonwebtoken");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const JWT_SECRET = process.env.JWT_SECRET || "changeme";
// If you want cookie-based auth, set AUTH_USE_COOKIE=true in .env
const USE_COOKIE = String(process.env.AUTH_USE_COOKIE || "false").toLowerCase() === "true";
const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "token";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn("Google OAuth env vars appear missing (GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET)");
}

// Start OAuth flow
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" })
);

// Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${FRONTEND_URL}/auth/failure` }),
  (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.redirect(`${FRONTEND_URL}/auth/failure`);
      }

      // Minimal payload — include only what you need
      const payload = { id: user._id?.toString?.() || user._id, email: user.email || "" };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

      if (USE_COOKIE) {
        // set secure httpOnly cookie (in production secure:true)
        res.cookie(COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        // Redirect to frontend WITHOUT token in URL
        return res.redirect(`${FRONTEND_URL}/auth/success`);
      } else {
        // Safer than query — put token into fragment so it isn't sent to servers
        const redirectUrl = `${FRONTEND_URL}/auth/success#token=${encodeURIComponent(token)}`;
        return res.redirect(redirectUrl);
      }
    } catch (err) {
      console.error("Google callback error:", err);
      return res.redirect(`${FRONTEND_URL}/auth/failure`);
    }
  }
);

// Optional failure endpoint (not strictly necessary because we redirect to frontend)
router.get("/auth/google/failure", (req, res) => {
  return res.status(401).send("Google auth failed");
});

module.exports = router;
