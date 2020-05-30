const mongoose = require("mongoose");

const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

//get a hold of the Stripe Webhooks Event Model class
const StripeWebhooksEvent = mongoose.model("stripe_webhooks_events");
//get a hold of the User Model class
const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/api/payment/stripe", requireLogin, async (req, res) => {
    const { quantity } = req.body;

    //create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Survey Credits",
            },
            unit_amount: 100,
          },
          quantity: req.body.quantity,
        },
      ],
      mode: "payment",
      success_url: `${keys.stripeRedirectUrl}/payment/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${keys.stripeRedirectUrl}/payment/canceled`,
      client_reference_id: req.user.id,
    });

    //and send back to client the SessionID
    res.send({ sessionId: session.id });
  });

  //Stripe Webhooks
  app.post("/api/payment/stripe/webhooks", async (req, res) => {
    // 1. Verify the Stripe-Signature to make sure that the webhook is indeed from Stripe
    // 2. Filter out the checkout.session.completed Event
    // 3. Check to see if the event has been processed, by look up the event.id in the database
    // 4. Get the payment_intent_id, client_reference_id from the session-object
    // 5. Load the payment_intent from Stripe
    // 6. Check the amount_recieved ( in cent $1 = 100 )
    // 7. Create Mongoose Query to update the user width id=client_reference_id, adding the credits/amout_recieved
    // 8. Response to the webhook with 200 code
    // 9. save the event.id to the database (how to set expirary date for a record)

    const sig = req.headers["stripe-signature"];
    let event;
    try {
      //construct the event with stripe-signature and endpoint-secret
      //helps verify that the webhooks is from Stripe
      event = stripe.webhooks.constructEvent(
        req.rawBody, //rawBody is required instead of body
        sig,
        keys.stripeWebhooksEndpointSecret
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      //If the event_id exists in the StripeWebhooksEvent log
      //The event has already been successfully processed
      if (await StripeWebhooksEvent.findOne({ eventId: event.id })) {
        //acknowledge successfully process the event
        return res.status(200).send({ received: true });
      }
    } catch (err) {
      return res.status(500).send(`Database Error: ${err.message}`);
    }

    //only interest in the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const { payment_intent, client_reference_id } = event.data.object;
      //retrieve the payment_intent object from Stripe
      let paymentIntent;
      try {
        paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
      } catch (err) {
        return res
          .status(500)
          .send(`Stripe PaymentIntent Retrieval Error: ${err.message}`);
      }
      if (paymentIntent) {
        //add credits to user's record
        //TODO
        //We assume that updating user's record would success.
        //What happen if it fails???
        addCreditsToUser(
          Math.ceil(paymentIntent.amount_received / 100),
          client_reference_id
        );
      }
      //log the processed event to avoid processing it more than once
      new StripeWebhooksEvent({ eventId: event.id }).save();
    }

    //acknowledge successfully process the event
    return res.status(200).send({ received: true });
  });
};

const addCreditsToUser = (credits, userId) => {
  //How should we hanle Update Failure????
  User.updateOne(
    {
      _id: userId,
    },
    { $inc: { credits } }
  ).exec();
};
