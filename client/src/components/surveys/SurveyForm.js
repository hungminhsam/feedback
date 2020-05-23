import React from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SurveyFormField from "./SurveyFormField";
import validateEmails from "../../utils/validateEmails";

const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Email Subject", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "Recipients", name: "recipients" },
];

const SurveyForm = (props) => {
  const rendernFields = () => {
    return FIELDS.map((field) => (
      <Field
        key={field.name} // this is to get rid of the unique key requirement in React List
        component={SurveyFormField}
        type="text"
        label={field.label}
        name={field.name}
      />
    ));
  };

  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)} className="ui form">
      {rendernFields()}
      <Link to="/surveys" className="ui primary button">
        Cancel
      </Link>
      <button
        className={`ui primary right floated ${
          props.invalid ? "disabled" : ""
        } button`}
        type="submit"
      >
        Next
      </button>
    </form>
  );
};

const validate = (formValues) => {
  const error = {};

  FIELDS.forEach(({ label, name }) => {
    if (!formValues[name]) {
      error[name] = `${label} is required, cannot be empty`;
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
