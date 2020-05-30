import React from "react";
import { Link } from "react-router-dom";

const StripePaymentSuccess = () => {
  return (
    <div>
      <div className="ui clearing basic segment">
        <h1 className="ui left floated header">
          <i className="check circle blue icon"></i>
          <div className="content">Payment Success</div>
        </h1>
      </div>
      <div className="ui raised very padded text container segment">
        <h2 className="ui header">Payment Success</h2>
        <p>
          Congratulation! You have successfully added credits to your account.
        </p>
        <p>
          It may takes sometime for the credits to be added.{" "}
          <a href="/surveys">Refresh</a> to see changes.
        </p>
        <Link to="/surveys">
          <i className="caret right blue icon"></i>
          Go to Dashboard
        </Link>
        <p></p>
      </div>
    </div>
  );
};

export default StripePaymentSuccess;
