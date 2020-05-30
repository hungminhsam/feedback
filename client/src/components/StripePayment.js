//This component display a simple form that allow user to specify the amount of credits to add
//Clicking the submit button will start the Stripe Checkout Process
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { postStripeToken } from "../actions";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

// const StripePayment = (props) => {
//   return (
//     <StripeCheckout
//       name="Emaily"
//       description="Add 5 email credits for $5"
//       amount={500}
//       token={(token) => props.postStripeToken(token)}
//       stripeKey={process.env.REACT_APP_STRIPE_KEY}
//     >
//       <button className="ui primary button">Add Credits</button>
//     </StripeCheckout>
//   );
// };

const StripePayment = (props) => {
  return (
    <form className="ui form">
      <input type="text" name="amount" />
      <button className="ui primary button">Add</button>
    </form>
  );
};

export default connect(null, { postStripeToken })(StripePayment);
