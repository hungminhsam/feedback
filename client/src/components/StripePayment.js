import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { postStripeToken } from "../actions";

const StripePayment = (props) => {
  return (
    <StripeCheckout
      name="Emaily"
      description="Add 5 email credits for $5"
      amount={500}
      token={(token) => props.postStripeToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="ui primary button">Add Credits</button>
    </StripeCheckout>
  );
};

export default connect(null, { postStripeToken })(StripePayment);
