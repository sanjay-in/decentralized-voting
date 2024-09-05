import React from "react";
import Button from "react-bootstrap/Button";
import "./Error.css";

const Error = ({ retry }) => {
  return (
    <div className="error-component">
      <div className="error-message">There is an error while loading data. Please retry</div>
      <Button variant="secondary" onClick={() => retry()}>
        Retry
      </Button>
    </div>
  );
};

export default Error;
