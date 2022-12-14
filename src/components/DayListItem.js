import React from "react";
import "styles/DayListItem.scss";
import "components/DayList";
import classNames from "classnames";

export default function DayListItem(props) {

  const dayClass = classNames("dayList", {
    "day-list__item": props,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = () => {
    // if no spots 
    if (!props.spots) {
      return <h3 className="text--light"> no spots remaining</h3>;
    }
    // if 1 spot
    if (props.spots === 1) {
      return <h3 className="text--light">1 spot remaining</h3>;
    }
    // if more than 1 spot 
    if (props.spots > 1) {
      return <h3 className="text--light">{props.spots} spots remaining</h3>;
    }
  };

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      {formatSpots()}
    </li>
  );
}
