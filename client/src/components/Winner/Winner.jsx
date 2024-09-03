import React from "react";
import WinnerCard from "./WinnerCard";
import "./Winner.css";

const Winner = ({ winner }) => {
  const { count, name } = winner[0];
  return (
    <div className="winner-container">
      <h4>The poll has ended</h4>
      {winner && winner.length > 1 ? (
        <div className="winner-tie">
          <h2>Its a tie!</h2>
          <div className="tie-candidates">
            {winner.map((candidate) => (
              <WinnerCard {...candidate} />
            ))}
          </div>
        </div>
      ) : (
        <div className="single-winner">
          <h2>
            {name} has won by {count} votes
          </h2>
          <div className="winner-card">
            <WinnerCard {...winner[0]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Winner;
