import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createSurvey } from "../actions";

const SurveyNewConfirm = (props) => {
  const [redirect, setRedirect] = useState(null);
  const [disable, setDisable] = useState(false);

  const onBackButtonClick = () => {
    setRedirect("/surveys/new");
  };

  const onCreateSurveyButtonClick = () => {
    setDisable(true);
    props.createSurvey(props.surveyForm, props.history);
  };

  //go back to the New Survey Form
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <React.Fragment>
      <h2>Create New Survey</h2>
      <div className="ui segment">
        <p>Please check that the information below is correct!</p>
        <p>
          Survey Title : <br /> {props.surveyForm.title}
        </p>
        <p>
          Email Subject : <br /> {props.surveyForm.subject}
        </p>
        <p>
          Email Content : <br /> {props.surveyForm.body}
        </p>
        <p>
          Recipients : <br /> {props.surveyForm.recipients}
        </p>
        <button
          className={`ui secondary ${disable ? "disabled" : ""} button`}
          onClick={onBackButtonClick}
        >
          Back
        </button>
        <button
          className={`ui primary ${disable ? "loading" : ""} button`}
          onClick={onCreateSurveyButtonClick}
        >
          Create New Survey
        </button>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { surveyForm: state.surveyForm };
};

export default connect(mapStateToProps, { createSurvey })(SurveyNewConfirm);
