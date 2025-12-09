// config/passportGoogle.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User"); // adjust path to your User model

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.warn("Google OAuth ENV not set (GOOGLE_CLIENT_ID/SECRET).");
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
        // profile contains emails, id, displayName
        const email = (profile.emails && profile.emails[0] && profile.emails[0].value) || null;
        const googleId = profile.id;
        const name = profile.displayName || "";

        // find or create user - adapt to your DB
        let user = await User.findOne({ googleId }).exec();
        if (!user && email) {
          // ensure not duplicate by email
          user = await User.findOne({ email }).exec();
        }

        if (!user) {
          user = await User.create({
            name,
            email,
            googleId,
            // mark as verified/registered via google
            // add other default fields as needed
          });
        } else if (!user.googleId) {
          // if user existed by email and had no googleId, attach it
          user.googleId = googleId;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// if you use sessions, configure serialize/deserialize — optional
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const User = require("../models/User");
  const u = await User.findById(id).exec();
  done(null, u || null);
});

module.exports = passport;
