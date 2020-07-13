import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

import { ReactComponent as DashboardIcon } from "../img/dashboard.svg";
import { ReactComponent as PlusIcon } from "../img/plus.svg";

const renderNewSurveyBnt = (auth) => {
  console.log(auth && auth.credits > 0);
  if (auth && auth.credits > 0) {
    return (
      <Link to="/surveys/new" className="btn btn--newsurvey">
        <PlusIcon className="btn__icon btn__icon--left" />
        New Survey
      </Link>
    );
  }

  return <div className="out-of-credits">You need to add more credits</div>;
};

const Dashboard = ({ auth }) => {
  return (
    <section className="section">
      <div className="section__heading section__heading--dashboard">
        <h1 className="section__heading__title">
          <DashboardIcon className="section__heading__icon" />
          Dashboard
        </h1>
        {renderNewSurveyBnt(auth)}
      </div>
      <SurveyList />
    </section>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Dashboard);
