import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./VoteConfirmation.css";

const VoteConfirmation = (props) => {
  const { name, id, party, image, show } = props;
  return (
    <div>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header show={show} closeButton></Modal.Header>
        <Modal.Body>
          <div className="confirmation-modal-body">
            <img className="confirmation-modal-img" src={image} />
            <div className="confirmation-modal-details">
              <div className="confirmation-modal-detail">
                <span>Candidate ID:</span>
                <div>#{id}</div>
              </div>
              <div className="confirmation-modal-detail">
                <span>Name:</span>
                <div>{name}</div>
              </div>
              <div className="confirmation-modal-detail">
                <span>Party:</span>
                <div>{party}</div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            //   onClick={handleClose}
          >
            Save Changes
          </Button>
          <Button
          //   onClick={props.onHide}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VoteConfirmation;
