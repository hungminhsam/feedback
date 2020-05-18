import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../actions";
import StrikePayment from "./StripePayment";

const Header = (props) => {
  const renderHeader = () => {
    if (!props.auth) {
      return <div className="ui text loader item">Loading</div>;
    }

    if (!props.auth.givenName) {
      return (
        <a href="/auth/google" className="item">
          Sign In With <i className="google red icon"></i>
        </a>
      );
    }
    return (
      <React.Fragment>
        <StrikePayment className="item" />
        <span className="item">Credits : {props.auth.credits}</span>
        <span className="item">{props.auth.givenName}</span>
        <Link
          to="/"
          onClick={() => {
            props.signOut();
          }}
          className="item"
        >
          Sign Out
        </Link>
      </React.Fragment>
    );
  };

  return (
    <div className="ui menu">
      <Link
        to={props.auth && props.auth.givenName ? "/surveys" : "/"}
        className="item"
      >
        <i className="react blue big icon"></i>
      </Link>
      <div className="right menu">{renderHeader()}</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { signOut })(Header);
