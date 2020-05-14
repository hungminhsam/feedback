const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");

const keys = require("./config/keys");

// Create Users Collection on MongDB
// Eventhough this line of code comes before MongoDB connection
// Moongoose will not throw any errors
// Because Mongoose Model Function Calls are buffered by default
//
// This line should be after MongoDB connection. It is here to prove the buffering
require("./models/Users");

//Connect to MongoDB
mongoose.connect(keys.mongoURI);

//Create Express APP
const app = express();
//set up Express to use Cookie Session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiration
    keys: [keys.cookieKey], // key used to encrypte the cookie
  })
);
//Tell passport to use Cookie for authentication
app.use(passport.initialize());
app.use(passport.session());

//Create Route Handlers for Authentication Routes
require("./routes/authRoutes")(app);

//set up passport for authentication
require("./services/passport");

// listens to port assigned by the Environment or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
