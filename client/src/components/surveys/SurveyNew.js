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
    <div>
      <div className="ui clearing basic segment">
        <h1 className="ui left floated header">
          <i className="comments icon"></i>
          <div className="content">Create New Survey</div>
        </h1>
      </div>

      <div className="ui segment">
        {page === 1 && <SurveyForm onSubmit={nextPage} />}
        {page === 2 && <SurveyFormReview previousPage={previousPage} />}
      </div>
    </div>
  );
};

export default reduxForm({ form: "surveyForm" })(SurveyNew);
