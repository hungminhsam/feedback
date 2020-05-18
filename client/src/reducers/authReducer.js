import { FETCH_USER, SIGN_OUT } from "../actions/types";

export default (auth = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case SIGN_OUT:
      return action.payload;
    default:
      return auth;
  }
};
