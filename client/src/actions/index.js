import { FETCH_USER, SIGN_OUT } from "./types";

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

export const signIn = () => async (dispatch) => {
  dispatch(fetchUser());
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
