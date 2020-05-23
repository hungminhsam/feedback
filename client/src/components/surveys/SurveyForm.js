import React from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SurveyFormField from "./SurveyFormField";
import formFields from "./formFields";
import validateEmails from "../../utils/validateEmails";

const SurveyForm = (props) => {
  const { handleSubmit, onSubmit } = props;
  const rendernFields = () => {
    return formFields.map((field) => (
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
    <form onSubmit={handleSubmit(onSubmit)} className="ui form">
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

  formFields.forEach(({ label, name }) => {
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
