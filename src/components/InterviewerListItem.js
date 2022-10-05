import React from "react";
import classNames from "classnames";
import "styles/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  
  const interviewers = classNames("interviewers", {
    interviewers__item: props,
    "interviewers__item--selected": props.selected,
  });

  const addName = function () {
    if (props.selected) {
      return <h6>{props.name}</h6>;
    }
  };

  return (
    <li className={interviewers} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {addName()}
    </li>
  );
}
