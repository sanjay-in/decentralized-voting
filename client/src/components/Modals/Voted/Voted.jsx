import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Voted.css";

const Voted = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body className="modal-body">
        <div className="voted-content">
          <div>You have already casted your vote. Thank you</div>
          <img src="https://i0.wp.com/netjapan.hk/wp-content/uploads/2018/12/Green-Tick-PNG-Pic-1.png?ssl=1" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Voted;
