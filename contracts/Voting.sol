// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

contract Voting {

    ///////////////////////
   // Type Declaration  //
  ///////////////////////

  struct Candidate {
    uint256 id;
    string name;
    string party;
    string image;
    uint256 count;
  }

    ///////////////////////
   // State Variables   //
  ///////////////////////

  Candidate[] private s_candidates;
  Candidate private s_winner;
  mapping (address => bool) s_hasVoted;
  uint256 private immutable i_startTime;
  uint256 private immutable i_endTime;

    ///////////////////////
   // Events            //
  ///////////////////////

  event VoteCasted(address indexed voter, uint256 indexed id, string name, string party);
  event WinnerSelected(uint256 indexed id, string name, string party, string image, uint256 count);
  event PollOpened();

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

  constructor(Candidate[] memory candidates, uint256 startTime, uint256 endTime) {
    for(uint256 i=0; i < candidates.length; i++) {
      uint256 candidateId = i+1;
      s_candidates.push(Candidate(
        candidateId,
        candidates[i].name,
        candidates[i].party,
        candidates[i].image,
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