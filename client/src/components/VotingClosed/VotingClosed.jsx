import React from "react";
import CandidateCard from "../Candidates/CandidateCard/CandidateCard";

const VotingClosed = ({ pollEnded, winner }) => {
  const { image, party, id, name } = winner;
  return (
    <div>
      {!pollEnded ? (
        <h2>The poll starts in: 00h:00mins:23secs</h2>
      ) : (
        <div>
          <h2>The poll has ended</h2>
          <div>The winner is</div>
          <CandidateCard image={image} party={party} id={id} name={name} />
        </div>
      )}
    </div>
  );
};

export default VotingClosed;
