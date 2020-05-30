//StripePayment
//Show a from with
// - single input field
// - increase button
// - decrease button
// - add/submit button
import React, { useReducer, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const reducer = (state, action) => {
  switch (action.type) {
    case "useEffectUpdate":
      return { ...state, ...action.payload };
    case "increment":
      return { ...state, quantity: state.quantity + 1 };
    case "decrement":
      return { ...state, quantity: state.quantity - 1 };
    case "setLoading":
      return { ...state, loading: action.payload.loading };
    case "setError":
      return { ...state, error: action.payload.error };
    default:
      throw new Error();
  }
};

const StripePayment = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    quantity: 1,
    loading: false,
    stripe: null,
    error: null,
  });

  //lifecycle hooks
  //the same as componentDidMount() & componentDidUpdate()
  useEffect(() => {
    //load stripe
    //need to wrap the await inside a function, otherwise we will get an error
    const loadConfig = async () => {
      dispatch({
        type: "useEffectUpdate",
        payload: { stripe: await loadStripe(process.env.REACT_APP_STRIPE_KEY) },
      });
    };
    loadConfig();
  }, []);

  //start stripe checkout
  const onStartStripeCheckout = async () => {
    //change the loading state
    dispatch({
      type: "setLoading",
      payload: { loading: true },
    });

    //request the backend for a checkout session
    const { sessionId } = await fetchCheckoutSession(state.quantity);

    //go to StripeCheckout Page after a session is created in the backend
    const { error } = await state.stripe.redirectToCheckout({ sessionId });
    if (error) {
      dispatch({
        type: "setError",
        payload: { error },
      });
      dispatch({
        type: "setLoading",
        payload: { loading: false },
      });
    }
  };

  // request a checkout session from the back end server
  // return a sessionId
  const fetchCheckoutSession = async (quantity) => {
    const res = await fetch("/api/payment/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    return res.json();
  };

  if (!state.error) {
    return (
      <div className="ui right labeled action input">
        <label htmlFor="amount" className="ui label">
          $
        </label>
        <input
          type="number"
          min="1"
          max="999"
          id="amount"
          value={state.quantity}
          readOnly
        />
        <button
          className="ui button"
          onClick={() => {
            dispatch({ type: "increment" });
          }}
        >
          +
        </button>
        <button
          className={`ui button ${state.quantity > 1 ? "" : "disabled"}`}
          onClick={() => {
            dispatch({ type: "decrement" });
          }}
        >
          -
        </button>
        <button
          className={`ui primary ${
            !state.stripe || state.loading ? "disabled" : ""
          } ${state.loading ? "loading" : ""} button`}
          onClick={onStartStripeCheckout}
        >
          Add Credits
        </button>
      </div>
    );
  } else {
    return (
      <div className="ui basic red label">
        <i className="exclamation triangle icon"></i>
        {state.error.message}
        <i
          className="delete icon"
          onClick={() => {
            dispatch({
              type: "setError",
              payload: { error: null },
            });
          }}
        ></i>
      </div>
    );
  }
};

export default StripePayment;
