import { FETCH_USER, SIGN_OUT, ERROR } from "./types";

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

export const submitSurvey = (surveyFormValues) => async (dispatch) => {
  //post the surveyFormValues to "/api/survey"
  //the Express Server will send back a User in Auth
  const res = await fetch("/api/surveys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(surveyFormValues),
  });
  const user = await res.json();

  if (user.error) {
    //dispatch({ type: ERROR, payload: user.error });
    alert(user.error);
  } else {
    //dispatch the FETCH_USER action to the reducers
    dispatch({ type: FETCH_USER, payload: user });
  }
};
