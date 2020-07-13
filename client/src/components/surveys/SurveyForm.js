import React from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SurveyFormField from "./SurveyFormField";
import formFields from "./formFields";
import validateEmails from "../../utils/validateEmails";

import { ReactComponent as ArrowRightIcon } from "../../img/keyboard_arrow_right.svg";

const SurveyForm = (props) => {
  const { handleSubmit, onSubmit } = props;

  const rendernFields = () => {
    return formFields.map((field) => (
      <Field
        key={field.name} // this is to get rid of the unique key requirement in React List
        component={SurveyFormField}
        type={field.type}
        label={field.label}
        name={field.name}
      />
    ));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="survey-form">
      {rendernFields()}
      <div className="survey-form__buttons">
        <Link to="/surveys" className="btn btn--cancel">
          Cancel
        </Link>
        <button
          className="btn btn--submit"
          disabled={props.invalid ? true : false}
          type="submit"
        >
          Next
          <ArrowRightIcon className="btn__icon btn__icon--right" />
        </button>
      </div>
    </form>
  );
};

const validate = (formValues) => {
  const error = {};

  formFields.forEach(({ label, name }) => {
    if (!formValues[name]) {
      error[name] = `${label} is required`;
    }
  });

  //validate emails
  if (!error.recipients) {
    const invalidEmailMsg = validateEmails(formValues.recipients);
    if (invalidEmailMsg) {
      error.recipients = invalidEmailMsg;
    }
  }

  return error;
};

export default reduxForm({
  form: "surveyForm",
  destroyOnUnmount: false,
  validate,
})(SurveyForm);
