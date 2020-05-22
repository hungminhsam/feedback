import { FETCH_USER, SIGN_OUT, SAVE_CREATE_NEW_SURVEY_FORM } from "./types";

export const fetchUser = () => async (dispatch) => {
  //attempt the fetch the user at /api/current_user
  const res = await fetch("/api/current_user");
  const user = await res.json();
  dispatch({ type: FETCH_USER, payload: user });
};

export const signOut = () => async (dispatch) => {
  const res = await fetch("/api/logout");
  const user = await res.json();
  dispatch({ type: SIGN_OUT, payload: user });
};

export const postStripeToken = (token) => async (dispatch) => {
  const res = await fetch("/api/payment/stripe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  });
  const user = await res.json();
  dispatch({ type: FETCH_USER, payload: user });
};

export const saveCreateNewSurveyForm = (surveyFormValues) => {
  return { type: SAVE_CREATE_NEW_SURVEY_FORM, payload: surveyFormValues };
};

export const createSurvey = (surveyFormValues, history) => async (
  dispatch,
  getState
) => {
  //post the surveyFormValues to "/api/survey"
  //the Express Server will send back a User in Auth
  const res = await fetch("/api/survey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(surveyFormValues),
  });
  const user = await res.json();
  //dispatch the FETCH_USER action to the reducers
  dispatch({ type: FETCH_USER, payload: user });
  //clear the surveyFormValue in Redux Store
  dispatch({ type: SAVE_CREATE_NEW_SURVEY_FORM, payload: {} });
  history.push("/surveys");
};
