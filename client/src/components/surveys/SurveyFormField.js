import React from "react";

const SurveyFormField = (props) => {
  const { input, type, label, meta } = props;

  const renderError = (meta) => {
    if (meta.touched && meta.error) {
      return <div className="survey-form__error">{meta.error}</div>;
    }
  };

  const renderInput = (type, input) => {
    if (type === "text") {
      return <input {...input} className="survey-form__input" />;
    }

    if (type === "textarea") {
      return (
        <textarea
          {...input}
          className="survey-form__input survey-form__input--textarea"
        />
      );
    }
  };

  return (
    <div
      className={`survey-form__field ${
        meta.touched && meta.error ? "error" : ""
      }`}
    >
      <div className="survey-form__label">{label}</div>
      {renderError(meta)}
      {renderInput(type, input)}
    </div>
  );
};

export default SurveyFormField;
