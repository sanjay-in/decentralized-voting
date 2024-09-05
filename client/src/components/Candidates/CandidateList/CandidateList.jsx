import React from "react";
import CandidateCard from "../CandidateCard/CandidateCard";
import "./CandidateList.css";
import Voted from "../../Modals/Voted/Voted";

const CandidateList = ({ candidates }) => {
  return (
    <div className="candidate-list">
      {candidates &&
        candidates.map(({ image, id, party, count, name }) => {
          return <CandidateCard image={image} key={id} id={id} party={party} count={count} name={name} />;
        })}
      <Voted show={false} />
    </div>
  );
};

export default CandidateList;
