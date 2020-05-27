import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyNewConfirm from "./surveys/SurveyFormReview";

const App = ({ fetchUser }) => {
  //[fetchUser] instead of [] is to get rid of the MISSING DEPENDENCY warning from React
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/surveys" component={Dashboard} />
        <Route exact path="/surveys/new" component={SurveyNew} />
        <Route exact path="/surveys/new/confirm" component={SurveyNewConfirm} />
      </BrowserRouter>
    </div>
  );
};

const mapStateToPros = (state, ownProps) => {
  return { auth: state.auth };
};
export default connect(mapStateToPros, { fetchUser })(App);
