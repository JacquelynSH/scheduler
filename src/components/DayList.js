import React, { useLayoutEffect } from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  return (
    <ul>
      {props.days.map((day) => {
        return (
          <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            setDay={props.setDay}
            selected={day.name === props.day}
          />
        );
      })}
    </ul>
  );
} 