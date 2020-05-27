import React from "react";

const Survey = (props) => {
  const {
    title,
    subject,
    body,
    yes,
    no,
    dateSent,
    lastResponded,
  } = props.survey;
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">{title}</div>
        <div className="meta">
          <div className="small">
            Created On: {new Date(dateSent).toLocaleDateString()}
          </div>
          <div className="small">
            Last Responded On: {new Date(lastResponded).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="ui sub header">{subject}</div>
        <div className="description">{body}</div>
      </div>
      <div className="extra content">
        <div className="ui basic green label">
          <i className="thumbs up outline icon"></i> Yes: {yes}
        </div>
        <div className="ui basic red label">
          <i className="thumbs down outline icon"></i> No: {no}
        </div>
        <div className="ui basic grey label">{no + yes} Votes</div>
      </div>
    </div>
  );
};

export default Survey;
