const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const pool = require("../db.js");
require("dotenv").config();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/user/google/callback",
    },
    async (issuer, profile, done) => {
      const user = await pool.query(
        "SELECT * FROM Account WHERE googleId=($1)",
        [profile.id]
      );

      if (user.rows.length == 0) {
        const newUser = await pool.query(
          "INSERT INTO Account(googleId, username, email) VALUES($1,$2,$3) RETURNING *",
          [profile.id, profile.displayName, profile.emails[0].value]
        );
        return done(null, newUser.rows[0]);
      } else {
        return done(null, user.rows[0]);
      }
    }
  )
);
