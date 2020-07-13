import React from "react";

const Landing = () => {
  return (
    <main className="landing">
      <div className="content-box">
        <div className="content-box__text">
          <h1 className="content-box__text--heading">Survey Creator</h1>
          <h2 className="content-box__text--heading--sub">
            Find our what your customers think. Fast & Easy!
          </h2>
          <p className="content-box__text--paragraph">
            Step 1: Sign up with your google account
          </p>
          <p className="content-box__text--paragraph">
            Step 2: Add credits to your account with our secure payment system.
          </p>
          <p className="content-box__text--paragraph">
            Step 3: Create surveys.
          </p>
          <p className="content-box__text--paragraph">
            Step 4: Wait for responses.
          </p>
        </div>
        <div className="content-box__action">
          <a href="/auth/google" className="btn btn--google">
            Sign In With Google
          </a>
        </div>
      </div>
    </main>
  );
};

export default Landing;
