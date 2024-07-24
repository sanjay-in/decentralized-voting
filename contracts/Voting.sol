// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

contract Voting {

    ///////////////////////
   // Type Declaration  //
  ///////////////////////

  struct Candidate {
    uint256 name;
    uint256 count;
  }

  struct Winner { 
    uint256 name;
    uint256 wonByCount;
  }
  
    ///////////////////////
   // State Variables   //
  ///////////////////////

  Candidate[] private s_candidates;
  Winner private s_winner;
  mapping (address voter => address candidate) s_voterToCandidates;
  mapping (address => uint) s_candidateVotes;
  uint256 private immutable i_startTime;
  uint256 private immutable i_endTime;

    ///////////////////////
   // Events            //
  ///////////////////////

  event VoteCasted(address indexed voter, address indexed candidate);

    ///////////////////////
   // Errors            //
  ///////////////////////

  error Voting__PollClosed();
  error Voting__PollNotOpen();
  error Voting__AlreadyCastedVote();

    ///////////////////////
   // Modifiers         //
  ///////////////////////

  modifier pollOpen() {
    if (block.timestamp >= i_endTime) {
      revert Voting__PollClosed();
    }
    if (block.timestamp < i_startTime) {
      revert Voting__PollNotOpen();
    }
    _;
  }

    ///////////////////////
   // Functions         //
  ///////////////////////

  constructor(uint256[] memory names, uint256 startTime, uint256 endTime) {
    for(uint256 i=0; i < names.length; i++) {
      s_candidates.push(Candidate(
        names[i],
        0
      ));
    }
    i_endTime = endTime;
    i_startTime = startTime;
  }

  function castVote() external {}

  function getStartAndEndTime() external view returns (uint256, uint256) {}

  function getCandidatesDetails() external view returns (Candidate[] memory) {}

  function getIsVotedCandidate() external view returns (bool) {}
}