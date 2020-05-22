import React, { useState } from "react";
import { connect } from "react-redux";
import { saveCreateNewSurveyForm } from "../actions";
import { Redirect } from "react-router-dom";

const SurveyNew = (props) => {
  //Create a HTML Form
  //Wire up the form to Redux Store
  //---Create Action Creator for Form Values
  //---Create Reducer to Update the Redux Store
  //---Map the Redux Store Data to the SurveyNew Props

  const [title, setTitle] = useState(props.surveyForm.title);
  const [subject, setSubject] = useState(props.surveyForm.subject);
  const [body, setBody] = useState(props.surveyForm.body);
  const [recipients, setRecipients] = useState(props.surveyForm.recipients);
  const [confirm, setConfirm] = useState(null);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const onBodyChange = (e) => {
    setBody(e.target.value);
  };

  const onRecipientsChange = (e) => {
    setRecipients(e.target.value);
  };

  const onSubmit = (e) => {
    //call Action Creator to update Redux Store
    props.saveCreateNewSurveyForm({ title, subject, body, recipients });
    //set the path to redirect so that when this component is re-rendered,
    //browser will be redirect to the set path
    setConfirm("/surveys/new/confirm");
  };

  //redirect to another route set in confirm state
  if (confirm) {
    return <Redirect to={confirm} />;
  }

  return (
    <React.Fragment>
      <h2>Create New Survey</h2>
      <div className="ui segment">
        <div className="ui form">
          <div className="field">
            <label>Survey Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Enter survey title"
              value={title}
              onChange={onTitleChange}
            />
          </div>
          <div className="field">
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              placeholder="Enter the Subject for the survey email"
              value={subject}
              onChange={onSubjectChange}
            />
          </div>
          <div className="field">
            <label>Email Body:</label>
            <textarea
              name="content"
              rows="6"
              placeholder="Enter the content of the survey email"
              value={body}
              onChange={onBodyChange}
            ></textarea>
          </div>
          <div className="field">
            <label>Recipients:</label>
            <textarea
              name="recipients"
              rows="6"
              placeholder="Enter the recipients' email addresses, comma separated"
              value={recipients}
              onChange={onRecipientsChange}
            ></textarea>
          </div>
          <button className="ui primary button" onClick={onSubmit}>
            Create
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { surveyForm: state.surveyForm };
};

export default connect(mapStateToProps, { saveCreateNewSurveyForm })(SurveyNew);
