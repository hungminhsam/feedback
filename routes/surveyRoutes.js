const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const emailTemplate = require("../services/emailTemplates/surveyTemplate");

//get a handle on the Survey Model Class
const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/survey/thanks", (req, res) => {
    res.send("Thank you for the feedback!");
  });

  app.post("/api/survey", requireLogin, requireCredits, async (req, res) => {
    //get data from the request's body
    const { title, subject, body, recipients } = req.body;

    //instanciate a new survey object
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => {
        return { email: email.trim() };
      }),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    //Instanciate a Mailer Object, pass to it the survey and template as the Body Content of the email
    const mailer = new Mailer(survey, emailTemplate(survey));

    try {
      //send emails
      await mailer.send();
      //save the survey after successfully send emails
      await survey.save();
      //subject user's credit and save use to database
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
