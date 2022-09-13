import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./interviewerList.scss";

export default function InterviewerList(props) {

 
return (

<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {props.interviewers.map((interviewer) => {
     return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.selected}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
     )
})}
  </ul>
</section>

);
}