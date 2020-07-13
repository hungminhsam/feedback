const express = require("express");
// const bodyParser = require("body-parser");
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
require("./models/User");
require("./models/Survey");
require("./models/StripeWebhooksEvent");

//Connect to MongoDB
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.log(
      "*******************MongoDB Connection Error*************************"
    );
    console.log(error);
  });

//Create Express APP
const app = express();
//apply body_parser middleware
// app.use(bodyParser.json()); Since Express v4.16.0 use express.json() instead
app.use(
  express.json({
    verify: (req, res, buf, encoding) => {
      //if the req.path is the Stripe Webhooks Handler
      //make the rawBody available as req.rawBody
      if (req.path === "/api/payment/stripe/webhooks") {
        req.rawBody = buf;
      }
    },
  })
);
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

//set up passport for authentication
require("./services/passport");

//Create Route Handlers for Authentication Routes
require("./routes/authRoutes")(app);
//Create Route Handlers for Billing
require("./routes/billingRoutes")(app);
//Create Route Handlers for surveys
require("./routes/surveyRoutes")(app);

// IN DEV ENVIRONMENT
// ------- we use 2 servers, React Dev Server and Express Server
// ------- React Dev Server listens to port 3000 --> http://localhost:3000
// ------- Express Server listens to port 5000 --> http://localhost:5000
// ------- our SPA is served by the React Dev Server
// ------- because we use RELATIVE PATH in our SPA App, Whenever the SPA send
// ------- a request to the back end server, it will automatically prepend the
// ------- React Dev Server address --> http://localhost:3000/<path>/
// ------- So the request will be sent to the React Dev Server
// ------- FOR the Express Server to hanlde its requests, React Dev Server needs to
// ------- forward those requests to the Express Server.
// ------- We set up Proxy for that in setupProxy.js
//
// IN PRODUCTION ENVIRONMENT
// ------- There is only 1 server, the Express Server
// ------- We need to tell this Express Server whether the user is requesting React App
// ------- Resoure or Express Server Resources
// ------- The Following codes do just that
if (process.env.NODE_ENV === "production") {
  // Tell Express Server to serve up production assets in 'client/build'
  // like main.js, bundle.js, main.css, etc.
  app.use(express.static("client/build"));

  // Tell Express Server to serve "/client/build/index.html" for every else
  // that it does not recognize
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// listens to port assigned by the Environment or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
