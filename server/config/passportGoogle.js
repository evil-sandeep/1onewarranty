// config/passportGoogle.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User"); // adjust path to your User model

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL; // ensure .env uses this name

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !CALLBACK_URL) {
  console.warn("Google OAuth ENV not set (GOOGLE_CLIENT_ID/SECRET/CALLBACK_URL).");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    // verify callback
    async function (accessToken, refreshToken, profile, done) {
      try {
        // profile may sometimes lack emails; guard it
        const emailRaw = (profile.emails && profile.emails[0] && profile.emails[0].value) || null;
        const email = emailRaw ? String(emailRaw).trim().toLowerCase() : null;
        const googleId = profile.id;
        const name = profile.displayName || "";

        // find by googleId first, then by email (normalized)
        let user = null;
        if (googleId) {
          user = await User.findOne({ googleId }).exec();
        }
        if (!user && email) {
          user = await User.findOne({ email }).exec();
        }

        if (!user) {
          // create user
          user = await User.create({
            name,
            email,
            googleId,
            // optionally store profile photo: profile.photos?.[0]?.value
          });
        } else if (!user.googleId && googleId) {
          // attach googleId if user existed by email
          user.googleId = googleId;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error("passportGoogle verify error:", err);
        return done(err);
      }
    }
  )
);

// Optional: only needed for session support
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (e) {
    done(e);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const u = await User.findById(id).exec();
    done(null, u || null);
  } catch (e) {
    console.error("passport deserialize error:", e);
    done(e);
  }
});

module.exports = passport;
