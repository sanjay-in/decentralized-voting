import React from "react";
import poster1 from "../../assets/poster1.jpg";
import poster2 from "../../assets/poster2.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-component">
      <h2 className="home-header">Decentralized Voting</h2>
      <div className="posters">
        <img className="poster-1" src={poster1} />
        <img className="poster-2" src={poster2} />
      </div>
    </div>
  );
};

export default Home;
