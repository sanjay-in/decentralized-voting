import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import success from "../../../assets/success.png";
import "./Success.css";

const Success = ({ show }) => {
  const closeModal = () => {
    window.location.reload();
  };
  return (
    <Modal id="success-modal" show={show} onHide={closeModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="success-modal-header">Success</Modal.Header>
      <Modal.Body className="success-modal-body">
        <div className="success-content">
          <img src={success} />
          <div>Thanks for casting your vote and becoming part of a revolution</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Success;
