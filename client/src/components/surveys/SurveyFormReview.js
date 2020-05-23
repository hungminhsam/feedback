import React, { useState } from "react";
import { connect } from "react-redux";
import { submitSurvey } from "../../actions";
import { withRouter } from "react-router-dom";
import { reset } from "redux-form";

const SurveyFormReview = (props) => {
  //the buttons will be disabled when the user click submit
  const [disable, setDisable] = useState(false);

  const onSubmit = async () => {
    //disabled buttons
    setDisable(true);
    //call Action Creator
    await props.submitSurvey(props.surveyFormValues);

    //redirect to the surveys page
    props.history.push("/surveys");
  };

  const renderFormValues = () => {
    return Object.entries(props.surveyFormValues).map(([name, value]) => {
      return (
        <div className="item" key={name}>
          <div className="ui horizontal label">{name}</div>
          {value}
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <p>Please check that the information below is correct!</p>
      <div className="ui divided list">{renderFormValues()}</div>
      <button
        className={`ui secondary ${disable ? "disabled" : ""} button`}
        onClick={props.previousPage}
      >
        Back
      </button>
      <button
        className={`ui primary ${disable ? "loading" : ""} button`}
        onClick={onSubmit}
      >
        Create New Survey
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { surveyFormValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, { submitSurvey })(
  withRouter(SurveyFormReview)
);
