import React, { useState } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

import { ReactComponent as NewSurveyIcon } from "../../img/file-text.svg";

const SurveyNew = (props) => {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  return (
    <section className="section">
      <div className="section__heading">
        <h1 className="section__heading__title">
          <NewSurveyIcon className="section__heading__icon" />
          Create New Survey
        </h1>
      </div>
      <div className="survey-form-container">
        {page === 1 && <SurveyForm onSubmit={nextPage} />}
        {page === 2 && <SurveyFormReview previousPage={previousPage} />}
      </div>
    </section>
  );
};

export default reduxForm({ form: "surveyForm" })(SurveyNew);
