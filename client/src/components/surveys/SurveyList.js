import React, { useEffect } from "react";
import { connect } from "react-redux";
import Survey from "./Survey";
import { fetchSurveys } from "../../actions";

const renderSurveys = (surveys) => {
  return surveys
    .reverse()
    .map((survey) => <Survey key={survey._id} survey={survey} />);
};

const SurveyList = (props) => {
  const { surveys, fetchSurveys } = props;

  // only fetch the surveys when component is mounted
  // [fetchSurveys] is used instead of [] is to get rid of MISSING DEPENDENCY warning from React
  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  return <div className="survey-list">{renderSurveys(surveys)}</div>;
};

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth, surveys: state.surveys };
};
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
