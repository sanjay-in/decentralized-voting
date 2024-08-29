import React from "react";
import CandidateCard from "../Candidates/CandidateCard/CandidateCard";
import { countdownClock } from "../CountdownClock/CountdownClock";
import "./VotingClosed.css";

const VotingClosed = ({ pollEnded, winner, startTime }) => {
  // const { image, party, id, name } = winner;
  const [days, hours, minutes, seconds] = countdownClock(startTime);
  return (
    <div>
      {!pollEnded ? (
        <h2 className="voting-start">
          Poll starts in{" "}
          <span>
            {days} days : {hours} hrs : {minutes} mins : {seconds} secs
          </span>
        </h2>
      ) : (
        <div>
          <h2>The poll has ended</h2>
          <div>The winner is</div>
          {/* <CandidateCard image={image} party={party} id={id} name={name} /> */}
        </div>
      )}
    </div>
  );
};

export default VotingClosed;
