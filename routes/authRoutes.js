const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // the string 'google' is setup by new GoogleStrategy() internally
      scope: ["profile", "email"], // we are asking google to give access to 'profile' and 'email'
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send({});
  });

  app.get("/api/current_user", (req, res) => {
    if (!req.user) {
      res.send({});
    }
    res.send(req.user);
  });
};
