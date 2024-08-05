import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./CandidateCard.css";

const CandidateCard = ({ image, count, id, party, name }) => {
  return (
    <div className="card">
      <Card style={{ width: "15rem" }}>
        <Card.Img className="card-img" variant="top" src={image} />
        <Card.Body>
          <Card.Title className="card-title">{name}</Card.Title>
          {/* <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text> */}
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="card-list-item">
              <span className="card-span">Candidate Number</span> #{id}
            </ListGroup.Item>
            <ListGroup.Item className="card-list-item">
              <span className="card-span">Party</span> {party}
            </ListGroup.Item>
            <ListGroup.Item className="card-list-item">
              <span className="card-span">Total Votes</span> {count}
            </ListGroup.Item>
          </ListGroup>
          <Button className="card-btn">Vote</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CandidateCard;
