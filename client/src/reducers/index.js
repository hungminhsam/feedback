import { combineReducers } from "redux";
import authReducer from "./authReducer";
import surveyFormReducer from "./surveyFormReducer";

export default combineReducers({
  auth: authReducer,
  surveyForm: surveyFormReducer,
});
