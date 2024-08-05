import React from "react";
import CandidateCard from "../CandidateCard/CandidateCard";
import "./CandidateList.css";

const CandidateList = () => {
  const candidatesList = [
    {
      id: 1,
      name: "Joe Biden",
      party: "Democratic Party",
      image: "https://blockgeeks.com/wp-content/uploads/2022/10/image4.png.webp",
      count: 0,
    },
    {
      id: 2,
      name: "Donald Trump",
      party: "Republican Party",
      image: "https://blockgeeks.com/wp-content/uploads/2022/10/image1-2.png.webp",
      count: 0,
    },
    {
      id: 1,
      name: "Joe Biden",
      party: "Democratic Party",
      image: "https://blockgeeks.com/wp-content/uploads/2022/10/image4.png.webp",
      count: 0,
    },
    {
      id: 2,
      name: "Donald Trump",
      party: "Republican Party",
      image: "https://blockgeeks.com/wp-content/uploads/2022/10/image1-2.png.webp",
      count: 0,
    },
  ];
  return (
    <div className="candidate-list">
      {candidatesList.map(({ image, id, party, count, name }) => {
        return <CandidateCard image={image} key={id} id={id} party={party} count={count} name={name} />;
      })}
    </div>
  );
};

export default CandidateList;
