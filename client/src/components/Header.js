import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../actions";
import StripePayment from "./StripePayment";

const Header = (props) => {
  const { auth, signOut } = props;
  const renderHeader = () => {
    if (!auth) {
      return <div className="ui text loader item">Loading</div>;
    }

    if (!auth.givenName) {
      return (
        <a href="/auth/google" className="item">
          Sign In With <i className="google red icon"></i>
        </a>
      );
    }
    return (
      <React.Fragment>
        <span className="item">
          <StripePayment />
        </span>
        <span className="item">Credits : {auth.credits}</span>
        <span className="item">{auth.givenName}</span>
        <Link
          to="/"
          onClick={() => {
            signOut();
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
      <Link to={auth && auth.givenName ? "/surveys" : "/"} className="item">
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
