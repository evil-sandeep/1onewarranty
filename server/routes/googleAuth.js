// routes/googleAuth.js
const express = require("express");
const router = express.Router();
const passport = require("../config/passportGoogle"); // this registers the strategy
const jwt = require("jsonwebtoken");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

// Start OAuth flow
// GET /auth/google
router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" })
);

// Callback
// GET /auth/google/callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/auth/google/failure" }),
  (req, res) => {
    // Successful authentication, user is in req.user
    try {
      const user = req.user;
      // Issue JWT (adapt payload as needed)
      const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

      // Redirect to frontend with token (fragment or query)
      // Using query param (be cautious about leaking in logs) — you can also set secure cookie.
      const redirectUrl = `${FRONTEND_URL}/auth/success?token=${token}`;
      return res.redirect(redirectUrl);
    } catch (err) {
      console.error("Google callback error:", err);
      return res.redirect(`${FRONTEND_URL}/auth/failure`);
    }
  }
);

router.get("/auth/google/failure", (req, res) => {
  return res.status(401).send("Google auth failed");
});

module.exports = router;
