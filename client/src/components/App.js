import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { fetchUser } from "../actions";

import Header from "./Header";
import Footer from "./Footer";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyNewConfirm from "./surveys/SurveyFormReview";
import StripePaymentSuccess from "./payment/StripePaymentSuccess";
import StripePaymentCanceled from "./payment/StripPaymentCanceled";

import loading from "../img/loading.gif";

const App = ({ auth, fetchUser }) => {
  //[fetchUser] instead of [] is to get rid of the MISSING DEPENDENCY warning from React
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!auth) {
    // still attempting to fetch user, show loading
    return (
      <div className="loading">
        <div className="loading__box">
          <img src={loading} alt="loading" className="loading__img" />
          <p>loading...</p>
        </div>
      </div>
    );
  } else if (!auth.givenName) {
    //user not logged in, show landing page
    return <Landing />;
  }

  //user has logged in, show protected contents
  return (
    <div className="protected-page">
      <BrowserRouter>
        {/* header will always show up */}
        <Header />
        <Route
          exact
          path="/payment/success/:sessionId"
          component={StripePaymentSuccess}
        />
        <Route
          exact
          path="/payment/canceled"
          component={StripePaymentCanceled}
        />
        {/* Redirect logged in user to /surveys */}
        <Route exact path="/">
          <Redirect push to="/surveys" />
        </Route>
        <Route exact path="/surveys" component={Dashboard} />
        <Route exact path="/surveys/new" component={SurveyNew} />
        <Route exact path="/surveys/new/confirm" component={SurveyNewConfirm} />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

const mapStateToPros = (state, ownProps) => {
  return { auth: state.auth };
};
export default connect(mapStateToPros, { fetchUser })(App);
