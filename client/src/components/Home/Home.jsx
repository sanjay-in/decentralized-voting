import React from "react";
import poster1 from "../../assets/poster1.jpg";
import poster2 from "../../assets/poster2.jpg";
import "./Home.css";
import CandidateList from "../Candidates/CandidateList/CandidateList";
import { countdownClock } from "../CountdownClock/CountdownClock";

const Home = () => {
  const [days, hours, minutes, seconds] = countdownClock(1725992999000);
  return (
    <div className="home-component">
      <h2 className="home-header">Decentralized Voting</h2>
      <div className="timer">
        <div className="timer-message">Poll closes in</div>
        {days} days : {hours} hrs : {minutes} mins : {seconds} secs
      </div>
      <div className="posters">
        <img className="poster-1" src={poster1} />
        <img className="poster-2" src={poster2} />
      </div>
      <CandidateList />
      {/* {console.log(`${days} days:${hours} hrs:${minutes} mins:${seconds} secs`)} */}
    </div>
  );
};

export default Home;
