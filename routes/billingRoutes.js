const mongoose = require("mongoose");

const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  // this route requires user to login
  // It apply the 'requireLogin' middleware
  // A Express Route Handler can have as many middleware as we want
  // The only requirement is one of these middleware must handle to request
  // and send back a response
  app.post("/api/payment/stripe", requireLogin, async (req, res) => {
    const token = req.body.id;
    try {
      const charge = await stripe.charges.create({
        description: "$5 for 5 email credits",
        amount: 500, // $5
        currency: "usd",
        source: token,
      });
      //add 5 credits to the user
      req.user.credits += 5;
      //save the user to MongoDB
      const user = await req.user.save();
      res.send(req.user);
    } catch (error) {
      console.log(error);
    }
  });
};
