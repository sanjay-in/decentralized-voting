import React from "react";
import { countdownClock } from "../CountdownClock/CountdownClock";
import "./Timer.css";

const Timer = ({ endTime }) => {
  const [days, hours, minutes, seconds] = countdownClock(endTime);
  return (
    <div className="timer">
      <div className="timer-message">Poll closes in</div>
      {days} days : {hours} hrs : {minutes} mins : {seconds} secs
    </div>
  );
};

export default Timer;
