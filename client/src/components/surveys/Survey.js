import React from "react";

import { ReactComponent as UserGroupIcon } from "../../img/group.svg";
import { ReactComponent as ThumbUpIcon } from "../../img/thumbs-up.svg";
import { ReactComponent as ThumbDownIcon } from "../../img/thumbs-down.svg";

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
    <>
      <div className="survey-item card">
        <div className="card__content">
          <div className="card__header">
            <h2>{title}</h2>
            <div className="card__meta">
              <div className="small">
                Created On: {new Date(dateSent).toLocaleDateString()}
              </div>
              <div className="small">
                Last Responded On:{" "}
                {new Date(lastResponded).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="card__body">
            <div className="card__description email">
              <div className="email__field email__field--subject">
                <div className="email__field__label">Email Subject</div>
                <span>{subject}</span>
              </div>
            </div>
            <div className="email__field email__field--body">
              <div className="email__field__label">Email Body</div>
              <span>{body}</span>
            </div>
          </div>

          <div className="card__footer survey__response">
            <div className="survey__count survey__count--total">
              <UserGroupIcon className="survey__count__icon" />
              {no + yes} Votes
            </div>
            <div className="survey__count survey__count--yes">
              <ThumbUpIcon className="survey__count__icon" /> {yes}
            </div>
            <div className="survey__count survey__count--no">
              <ThumbDownIcon className="survey__count__icon" /> {no}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Survey;
