const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // the string 'google' is setup by new GoogleStrategy() internally
      scope: ["profile", "email"], // we are asking google to give access to 'profile' and 'email'
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    if (!req.user) {
      res.send("Operation NOT Authorized");
    }
    res.send(req.user);
  });
};
