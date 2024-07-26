// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract Voting is AutomationCompatibleInterface {
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

    Candidate private s_winner;
    mapping(uint256 => Candidate) s_candidates;
    mapping(address => bool) s_hasVoted;
    uint256 private immutable i_startTime;
    uint256 private immutable i_endTime;
    uint256 private immutable i_candidatesCount;

    ///////////////////////
    // Events            //
    ///////////////////////

    event VoteCasted(
        address indexed voter,
        uint256 indexed id,
        string name,
        string party
    );
    event WinnerSelected(
        uint256 indexed id,
        string name,
        string party,
        string image,
        uint256 count
    );
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

    modifier alreadyVoted(address sender) {
        if (s_hasVoted[sender]) {
            revert Voting__AlreadyCastedVote();
        }
        _;
    }

    ///////////////////////
    // Functions         //
    ///////////////////////

    /**
     * Constructor loops through the candidates array and maps id to candidate info
     * and sets the total candidates count
     * @param candidates gets an array of Candidate[] (struct)
     * @param startTime start time of the contract
     * @param endTime ending time of the contract
     */
    constructor(
        Candidate[] memory candidates,
        uint256 startTime,
        uint256 endTime
    ) {
        for (uint256 i = 0; i < candidates.length; i++) {
            uint256 candidateId = i + 1;
            s_candidates[candidateId] = Candidate(
                candidateId,
                candidates[i].name,
                candidates[i].party,
                candidates[i].image,
                0
            );
        }
        i_endTime = endTime;
        i_startTime = startTime;
        i_candidatesCount = candidates.length;
    }

    /**
     * Checks if the poll is open and voter has already voted
     * Maps the user address to voted and emits event
     * @param _candidateId ID of the candidate to cast vote for
     */
    function castVote(
        uint256 _candidateId
    ) external pollOpen alreadyVoted(msg.sender) {
        s_hasVoted[msg.sender] = true;
        s_candidates[_candidateId].count += 1;
        Candidate memory votedForCandidate = s_candidates[_candidateId];
        emit VoteCasted(
            msg.sender,
            _candidateId,
            votedForCandidate.name,
            votedForCandidate.party
        );
    }

    /**
     * Returns start and end time of the contract
     * @return i_startTime
     * @return i_endTime
     */
    function getStartAndEndTime() external view returns (uint256, uint256) {
        return (i_startTime, i_endTime);
    }

    /**
     * Checks if poll is open and returns the details for all candidates
     * @return allCandidates array of Candidate[]
     */
    function getCandidatesDetails()
        external
        view
        pollOpen
        returns (Candidate[] memory)
    {
        Candidate[] memory allCandidates;
        for (uint i = 0; i < i_candidatesCount; i++) {
            allCandidates[i] = (s_candidates[i]);
        }
        return allCandidates;
    }

    /**
     * Checks if poll open and returns if the voter has already casted vote
     * @return boolean
     */
    function getIsVotedCandidate() external view pollOpen returns (bool) {
        return s_hasVoted[msg.sender];
    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = (block.timestamp > i_endTime);
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        if (block.timestamp > i_endTime) {
          Candidate memory _winner;
          uint256 _highestVote = 0;
          for (uint i = 0; i < s_candidates.length; i++) {
            if (s_candidates[i+1].count > _highestVote) { // id of the candidate starts from 1
              _winner = s_candidates[i+1]
              _highestVote = s_candidates[i+1].count
            }
          }
          if (_winnner) {
            s_winner = _winner
            emit WinnerSelected(
              s_winner.id,
              s_winner.name,
              s_winner.party,
              s_winner.image,
              s_winner.count
            );
          }
        }
    }
}
