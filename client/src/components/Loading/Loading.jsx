import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Loading.css";

const Loading = ({ variant, message }) => {
  return (
    <div className="loading">
      <Spinner animation="border" variant={variant ? variant : "secondary"} />
      {message ? <div className="loading-message">{message}</div> : null}
    </div>
  );
};

export default Loading;
