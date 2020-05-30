import React from "react";
import { Link } from "react-router-dom";

const StripePaymentCanceled = () => {
  return (
    <div>
      <div className="ui clearing basic segment">
        <h1 className="ui left floated header">
          <i className="exclamation circle yellow icon"></i>
          <div className="content">Payment Canceled</div>
        </h1>
      </div>
      <div className="ui raised very padded text container segment">
        <h2 className="ui header">Payment Canceled</h2>
        <p>You have canceled the checkout process</p>
        <Link to="/surveys">
          <i className="caret right blue icon"></i>
          Go to Dashboard
        </Link>
        <p></p>
      </div>
    </div>
  );
};

export default StripePaymentCanceled;
