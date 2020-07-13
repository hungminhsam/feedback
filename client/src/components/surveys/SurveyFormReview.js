import React, { useState } from "react";
import { connect } from "react-redux";
import { submitSurvey } from "../../actions";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";

const SurveyFormReview = (props) => {
  const { surveyFormValues, submitSurvey, previousPage } = props;

  //the buttons will be disabled when the user click submit
  const [disable, setDisable] = useState(false);

  const onSubmit = async () => {
    //disabled buttons
    setDisable(true);
    //call Action Creator
    await submitSurvey(surveyFormValues);

    //redirect to the surveys page
    props.history.push("/surveys");
  };

  const renderFormValues = () => {
    return formFields.map(({ label, name }) => {
      return (
        <div className="survey-form-review__field" key={name}>
          <div className="survey-form-review__label">{label}</div>
          <div className="survey-form-review__value">
            {surveyFormValues[name]}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="survey-form-review">
      <p className="survey-form-review__prompt">
        Please check that the information below is correct
      </p>
      <div className="survey-form-review__fields">{renderFormValues()}</div>
      <div className="survey-form__buttons">
        <button
          disabled={disable ? true : false}
          className="btn btn--cancel"
          onClick={previousPage}
        >
          Back
        </button>
        <button
          disabled={disable ? true : false}
          className={`btn ${disable ? "btn--submitting" : "btn--submit"}`}
          onClick={onSubmit}
        >
          Create New Survey
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { surveyFormValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, { submitSurvey })(
  withRouter(SurveyFormReview)
);
