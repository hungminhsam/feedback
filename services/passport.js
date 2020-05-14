const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

const mongoose = require("mongoose");
const User = mongoose.model("users"); //get a handle of Users Model (users collection)

// this function takes a user record
// then generate an Identifying Token using user.id
// user.id is the id generated internally by MongoDB
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// this function takes 'id', which is the Identifying Token
// attached the incoming request as a cookie
// then search MongoDB for a record that matches this 'id'
// and return the user record
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

//set up passport to use Google OAuth2.0 Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //this is the URL User will be redirected to after completing Google Aunthetication
      callbackURL: "/auth/google/callback",
      // this tell GoogleStrategy to trust the proxy between our Server and Browser
      // this will enable https in the callback
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }) //search for the user
        .then((existingUser) => {
          if (!existingUser) {
            // create a new Record if it does not exist
            // need to call save() to persist the User Instance (Record) to MongoDB
            new User({
              googleId: profile.id,
              givenName: profile.name.givenName,
              familyName: profile.name.familyName,
              email: profile.emails.value,
            })
              .save()
              .then((user) => done(null, user))
              .catch((error) => {});
          } else {
            console.log(`Welcome back! ${profile.name.givenName}`);
            done(null, existingUser);
          }
        })
        .catch((error) => {});
    }
  )
);
