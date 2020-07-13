import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as SuccessIcon } from "../../img/checkbox-checked.svg";
import { ReactComponent as ArrowRightIcon } from "../../img/keyboard_arrow_right.svg";

const StripePaymentSuccess = () => {
  return (
    <section className="section">
      <div className="section__heading">
        <h1 className="section__heading__title">
          <SuccessIcon className="section__heading__icon section__heading__icon--success" />
          Payment Succeed
        </h1>
      </div>
      <div className="card">
        <div className="card__content">
          <div className="card__body">
            <h2>Payment Succeed</h2>
            <p>
              Congratulation! You have successfully added credits to your
              account.
            </p>
            <p>
              It may takes sometime for the credits to be added.{" "}
              <a href="/surveys" className="link">
                Refresh
              </a>{" "}
              to see changes.
            </p>
            <Link to="/surveys" className="link link--flex">
              <ArrowRightIcon className="link__icon" />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StripePaymentSuccess;
