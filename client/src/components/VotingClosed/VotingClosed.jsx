import React from "react";
import CandidateCard from "../Candidates/CandidateCard/CandidateCard";
import { countdownClock } from "../CountdownClock/CountdownClock";
import "./VotingClosed.css";
import Winner from "../Winner/Winner";

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
        <Winner
          winner={[
            {
              id: 1,
              name: "Joe Biden",
              party: "Democratic Party",
              image: "https://boredapeyachtclub.com/_next/image?url=%2Fimages%2Ftransitions%2Fbayc%2F2.webp&w=1200&q=75",
              count: 0,
            },
            {
              id: 1,
              name: "Joe Biden",
              party: "Democratic Party",
              image: "https://boredapeyachtclub.com/_next/image?url=%2Fimages%2Ftransitions%2Fbayc%2F2.webp&w=1200&q=75",
              count: 0,
            },
          ]}
        />
      )}
    </div>
  );
};

export default VotingClosed;
