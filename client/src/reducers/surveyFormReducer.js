import { SAVE_CREATE_NEW_SURVEY_FORM } from "../actions/types";

export default (surveyForm = {}, action) => {
  switch (action.type) {
    case SAVE_CREATE_NEW_SURVEY_FORM:
      return action.payload;
    default:
      return surveyForm;
  }
};
