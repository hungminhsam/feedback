import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as WarningIcon } from "../../img/warning.svg";
import { ReactComponent as ArrowRightIcon } from "../../img/keyboard_arrow_right.svg";

const StripePaymentCanceled = () => {
  return (
    <section className="section">
      <div className="section__heading section__heading--canceled">
        <h1 className="section__heading__title">
          <WarningIcon className="section__heading__icon section__heading__icon--warning" />
          Payment Canceled
        </h1>
      </div>
      <div className="card">
        <div className="card__content">
          <div className="card__body">
            <h2>Payment Canceled</h2>
            <p>You have canceled the checkout process</p>
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

export default StripePaymentCanceled;
