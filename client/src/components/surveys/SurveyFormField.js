import React from "react";

const SurveyFormField = (props) => {
  const { input, label, meta } = props;

  const renderError = (meta) => {
    if (meta.touched && meta.error) {
      return <p className="ui pointing below red basic label">{meta.error}</p>;
    }
  };

  return (
    <div className={`field ${meta.touched && meta.error ? "error" : ""}`}>
      <div className="ui pointing below label">{label}</div>
      {renderError(meta)}
      <input {...input} />
    </div>
  );
};

export default SurveyFormField;
