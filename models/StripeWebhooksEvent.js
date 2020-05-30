const mongoose = require("mongoose");
const { Schema } = mongoose;

//create a schema for Strip Webhooks Event collection / models
const stripeWebhooksEvent = new Schema({
  eventId: String,
  //the record will expire in 3 days === days Stripe will attempt to send webhooks
  createdAt: { type: Date, expires: "3d", default: Date.now },
});

//Create the Stripe Webhooks Collection in MongoDB
mongoose.model("stripe_webhooks_events", stripeWebhooksEvent);
