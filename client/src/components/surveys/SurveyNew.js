import React, { useState } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

const SurveyNew = (props) => {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  return (
    <React.Fragment>
      <h2>Create New Survey</h2>
      <div className="ui segment">
        {page === 1 && <SurveyForm onSubmit={nextPage} />}
        {page === 2 && <SurveyFormReview previousPage={previousPage} />}
      </div>
    </React.Fragment>
  );
};

export default reduxForm({ form: "surveyForm" })(SurveyNew);
