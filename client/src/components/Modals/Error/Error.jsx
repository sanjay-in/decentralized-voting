import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import error from "../../../assets/error.png";
import "./Error.css";

const Error = ({ show }) => {
  const closeModal = () => {
    window.location.reload();
  };
  return (
    <Modal id="error-modal" show={show} onHide={closeModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="error-modal-header">Failed</Modal.Header>
      <Modal.Body className="error-modal-body">
        <div className="error-content">
          <img src={error} />
          <div>Sorry. Something went wrong please try again later.</div>
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

export default Error;
