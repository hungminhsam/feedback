import React from "react";
import { connect } from "react-redux";
import { signOut } from "../actions";
import { Link } from "react-router-dom";
import StripePayment from "./payment/StripePayment";
import arrowDownIcon from "../img/keyboard_arrow_down.svg";
import { actionTypes } from "redux-form";

const ProfileNav = (props) => {
  const { auth, signOut } = props;

  return (
    <div className="profile-nav">
      <div className="profile-nav__title">
        <span>{auth.givenName}</span>
        <img src={arrowDownIcon} alt="Arrow Down Icon" />
      </div>
      <div className="profile-nav__links">
        <div className="profile-nav__item profile-name">
          <div className="profile-name__icon">
            {auth.givenName[0] + auth.familyName[0]}
          </div>
          <div className="profile-name__text">
            {auth.givenName} {auth.familyName}
          </div>
        </div>
        <div className="profile-nav__divider"></div>

        <div className="profile-nav__item">
          <div className="credits">
            You have <span className="credits__count">{auth.credits}</span>{" "}
            credits
          </div>
          <StripePayment />
        </div>
        <div className="profile-nav__divider"></div>
        <div className="profile-nav__item">
          <Link
            className="profile-nav__item__link"
            to="/"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { signOut })(ProfileNav);
