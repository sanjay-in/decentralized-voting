import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./WinnerCard.css";

const WinnerCard = ({ image, count, party, name }) => {
  return (
    <Card id="winner-card">
      <Card.Img className="winner-card-img" variant="top" src={image} />
      <Card.Body id="winner-card-body">
        <Card.Title className="winner-card-title">{name}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="winner-card-list-item">
            <span className="winner-card-span">Party:</span> {party}
          </ListGroup.Item>
          <ListGroup.Item className="winner-card-list-item">
            <span className="winner-card-span">Total Votes:</span> {count}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default WinnerCard;
