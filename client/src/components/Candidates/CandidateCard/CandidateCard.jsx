import React, { useState } from "react";
import VoteConfirmation from "../../Modals/VoteConfirmation/VoteConfirmation";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./CandidateCard.css";

const CandidateCard = ({ image, count, id, party, name, hasVoted }) => {
  const [showVotingConfirmation, setShowVotingConfirmation] = useState(false);
  return (
    <div>
      <Card id="card">
        <Card.Img className="card-img" variant="top" src={image} />
        <Card.Body id="card-body">
          <Card.Title className="card-title">{name}</Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="card-list-item">
              <span className="card-span">Candidate Number:</span> #{Number(id)}
            </ListGroup.Item>
            <ListGroup.Item className="card-list-item">
              <span className="card-span">Party:</span> {party}
            </ListGroup.Item>
            <ListGroup.Item className="card-list-item">
              <span className="card-span">Total Votes:</span> {Number(count)}
            </ListGroup.Item>
          </ListGroup>
          {hasVoted ? (
            <div></div>
          ) : (
            <Button className="card-btn" onClick={() => setShowVotingConfirmation(!showVotingConfirmation)} disabled={hasVoted}>
              Vote
            </Button>
          )}
        </Card.Body>
      </Card>
      <VoteConfirmation image={image} id={id} party={party} name={name} show={showVotingConfirmation} hide={setShowVotingConfirmation} />
    </div>
  );
};

export default CandidateCard;
