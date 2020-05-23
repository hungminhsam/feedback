import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = ({ auth }) => {
  //disabled the New Survey Button if there is no credits
  const disabledNewSurvey = auth && auth.credits > 0 ? "" : "disabled";
  return (
    <div>
      Dashboard
      <Link
        to="/surveys/new"
        className={`ui right floated labeled icon green large basic ${disabledNewSurvey} button`}
      >
        <i className="plus square green icon"></i>
        New Survey
      </Link>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Dashboard);
