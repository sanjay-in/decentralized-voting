import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./WinnerCard.css";

const WinnerCard = ({ image, count, id, party, name }) => {
  return (
    <Card id="card">
      <Card.Img className="card-img" variant="top" src={image} />
      <Card.Body id="card-body">
        <Card.Title className="card-title">{name}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="card-list-item">
            <span className="card-span">Party:</span> {party}
          </ListGroup.Item>
          <ListGroup.Item className="card-list-item">
            <span className="card-span">Total Votes:</span> {count}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default WinnerCard;
