const _ = require("lodash");
const { Path } = require("path-parser"); //helper library for processing the URL Path
const { URL } = require("url"); //Helper library that comes with NodeJS
const mongoose = require("mongoose");

const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Mailer = require("../services/Mailer");
const emailTemplate = require("../services/emailTemplates/surveyTemplate");

//get a handle on the Survey Model Class
const Survey = mongoose.model("surveys");

module.exports = (app) => {
  //Route Handler for getting a list of surveys associate with an account
  app.get("/api/surveys", requireLogin, async (req, res) => {
    //load the list of surveys belong the logged in account from DB
    const surveys = await Survey.find({ _user: req.user.id }, "-recipients");
    res.send(surveys);
  });

  //Route Handler for displaying thank you message after user provides feedback
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thank you for the feedback!");
  });

  //Route Handler for creating New Survey
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    //get data from the request's body
    const { title, subject, body, recipients } = req.body;

    //instanciate a new survey object
    const survey = new Survey({
      title,
      subject,
      body,
      //TODO: eleminate duplicate emails
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
      //subtract user's credit and save use to database
      req.user.credits -= 1;
      //save the user to database
      const user = await req.user.save();
      //response to the request with user data
      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });

  //Route Handler for processing Survey Data from SendGrid
  app.post("/api/surveys/webhooks", (req, res) => {
    //This section deals with 'click' events
    //1. Filter out the CLICK EVENTS
    //2. Extract the SurveyId and Response Choice (Yes / No)
    //3. Eleminate DUPLICATED CLICKS
    //   Use Timestamp to decide which one to keep - keep the earlier one
    //4. Loop through the CLICK EVENTS, and record user's choice

    //We expected the request route is of this specified pattern
    //Extract and assign data to "surveyId" and "choice"
    const path = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body)
      .filter({ event: "click" }) //filter out the "click" events
      .map((event) => {
        //extract surveyId & choice from url
        const match = path.test(new URL(event.url).pathname);
        //return an object if the pathname of the url matches the specified pattern
        //return Undefined otherwise
        if (match) {
          return { email: event.email, timestamp: event.timestamp, ...match };
        }
      })
      .compact() //remove all the undefined elements in the array
      .sortBy("timestamp") //sort the array in ascending order of timestamp
      .uniqBy("email", "surveyId") //discard all elements with the same email & surveyId
      .each(({ surveyId, email, choice, timestamp }) => {
        //for each event, executing the following MongoDB query
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: { $elemMatch: { email, responded: false } },
          },
          {
            $inc: { [choice]: 1 },
            $set: {
              "recipients.$.responded": true,
              "recipients.$.choice": choice,
              lastResponded: new Date(timestamp * 1000),
            },
          }
        ).exec();
      })
      .value(); //calling value() is required for every lodash chain

    //Loop through the CLICKS EVENTS and record user's choice
    //clicks.forEach(async ({ surveyId, choice, email, timestamp }) => {
    /*********************** BAD APPROACH ***************************/
    // //load the survey
    // const survey = await Survey.findOne({ _id: surveyId });
    // //locate the recipient
    // const recipient = _.find(survey.recipients, { email: email });
    // console.log(recipient);
    // if (recipient && !recipient.responded) {
    //   //ignore this response if the user has responded
    //   recipient.responded = true;
    //   recipient.choice = choice; //record user's choice
    //   if (choice === "yes") {
    //     survey.yes++;
    //   } else if (survey.choice === "no") {
    //     survey.no++;
    //   }
    //   survey.lastResponded = new Date().setTime(timestamp * 1000); //update the latest responded time
    //   //save the updated survey back to databse
    //   survey.save();
    // }
    //});

    //This section deals with 'delivered' events

    //This section deals with 'bounce' events

    //This section deals with 'open' events

    //This section deals with 'spam-report' events

    res.send({});
  });
};
