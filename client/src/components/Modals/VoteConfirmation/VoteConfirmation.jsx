import React, { useState } from "react";
import { Contract, ethers } from "ethers";
import ABI from "../../../../constants/contractABI";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Success from "../Success/Success";
import Error from "../Error/Error";
import "./VoteConfirmation.css";

const VoteConfirmation = (props) => {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const { name, id, party, image, show, hide } = props;
  const [loading, setLoading] = useState(false);
  const [isVoteCasted, setIsVoteCasted] = useState(false);
  const [error, setError] = useState(false);

  const confirmVote = async () => {
    setLoading(true);
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const voting = new Contract(contractAddress, ABI, signer);

        const tx = await voting.castVote(Number(id));
        await tx.wait();
        hide(false);
        setIsVoteCasted(true);
      }
    } catch (error) {
      hide(false);
      console.log("error", error);
      setError(true);
      setLoading(false);
    }
  };
  return (
    <div>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" show={show} onHide={() => hide(!show)} centered>
        <Modal.Header className="confirmation-modal-header" closeButton>
          Confirm your vote
        </Modal.Header>
        <Modal.Body>
          <div className="confirmation-modal-body">
            <img className="confirmation-modal-img" src={image} />
            <div className="confirmation-modal-details">
              <div className="confirmation-modal-detail">
                <span>Candidate ID:</span>
                <div>#{Number(id)}</div>
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
          <Button className="confirmation-btn" disabled={loading} onClick={() => confirmVote()}>
            {loading ? <Spinner style={{ height: "1rem", width: "1rem" }} animation="border" /> : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
      {isVoteCasted ? <Success show={isVoteCasted} /> : error ? <Error show={error} /> : null}
    </div>
  );
};

export default VoteConfirmation;
