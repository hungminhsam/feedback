import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import Header from "./Header";

const Landing = (props) => {
  return <div>Landing</div>;
};

const Dashboard = (props) => {
  return <div>Dashboard</div>;
};

const SurveyNew = (pros) => {
  return <div>SurveyNew</div>;
};

const App = (props) => {
  useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/surveys" component={Dashboard} />
        <Route exact path="/surveys/new" component={SurveyNew} />
      </BrowserRouter>
    </div>
  );
};

const mapStateToPros = (state, ownProps) => {
  return { auth: state.auth };
};
export default connect(mapStateToPros, { fetchUser })(App);
