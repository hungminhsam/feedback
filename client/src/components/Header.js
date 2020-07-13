import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../actions";
import StripePayment from "./payment/StripePayment";

// import logo from "../img/logo.svg";
import { ReactComponent as LogoComponent } from "../img/logo.svg";
import ProfileNav from "./ProfileNav";

const Header = (props) => {
  const { auth, signOut } = props;

  const renderHeader = () => {
    // if (!auth) {
    //   return <div className="ui text loader item">Loading</div>;
    // }
    // if (!auth.givenName) {
    //   return (
    //     <a href="/auth/google" className="item">
    //       Sign In With <i className="google red icon"></i>
    //     </a>
    //   );
    // }
    // return (
    //   <React.Fragment>
    //     <span className="item">
    //       <StripePayment />
    //     </span>
    //     <span className="item">Credits : {auth.credits}</span>
    //     <span className="item">{auth.givenName}</span>
    //     <Link
    //       to="/"
    //       onClick={() => {
    //         signOut();
    //       }}
    //       className="item"
    //     >
    //       Sign Out
    //     </Link>
    //   </React.Fragment>
    // );
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/surveys" className="logo__link">
          {/* <img src={logo} alt="Logo Icon" className="logo__img" /> */}
          <LogoComponent className="logo__img" />
        </Link>
        <span className="brand">Survey Creator</span>
      </div>
      <div className="header__nav">
        <ProfileNav />
      </div>
    </header>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { signOut })(Header);
