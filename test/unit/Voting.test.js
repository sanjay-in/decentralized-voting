const { assert, expect } = require("chai");
const { network, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Voting", () => {
      let voting;
      const candidates = [
        {
          id: 1,
          name: "Joe Biden",
          party: "Democratic Party",
          image: "img",
          count: 0,
        },
        { id: 2, name: "Donald Trump", party: "Republican Party", image: "img", count: 0 },
      ];
      const startTimeInUNIX = 1722067032;
      const endTimeInUNIX = 1723487399;

      beforeEach(async () => {
        [_deployer] = await ethers.getSigners();
        deployer = _deployer;
        // await deployments.fixture(["all"]);

        voting = await ethers.deployContract("Voting", [candidates, startTimeInUNIX, endTimeInUNIX]);
        await voting.waitForDeployment();
      });

      describe("constructor", () => {
        it("sets all the initial data right", async () => {
          const deployedCandidates = await voting.getCandidatesDetails();
          for (let index = 0; index < deployedCandidates.length; index++) {
            for (const property in candidates[index]) {
              if (property === "id" || property === "count") {
                assert.equal(Number(deployedCandidates[index][property]), candidates[index][property]);
              } else {
                assert.equal(deployedCandidates[index][property], candidates[index][property]);
              }
            }
          }
          const [startTime, endTime] = await voting.getStartAndEndTime();
          assert.equal(startTime, startTimeInUNIX);
          assert.equal(endTime, endTimeInUNIX);
        });
      });

      describe("modifiers", () => {
        it("checks if the modifier reverts with poll closed error", async () => {
          const endTimeStampAsNow = Math.floor(Date.now() / 1000);
          const deployedContract = await ethers.deployContract("Voting", [candidates, startTimeInUNIX, endTimeStampAsNow]);
          await deployedContract.waitForDeployment();

          await expect(deployedContract.getCandidatesDetails()).to.be.revertedWithCustomError(deployedContract, "Voting__PollClosed");
        });

        it("throws error if the voting is entered before start time", async () => {
          const startTimeAfterAWeek = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
          const deployedContract = await ethers.deployContract("Voting", [candidates, startTimeAfterAWeek, endTimeInUNIX]);
          await deployedContract.waitForDeployment();

          await expect(deployedContract.getCandidatesDetails()).to.be.revertedWithCustomError(deployedContract, "Voting__PollNotOpen");
        });

        it("throws an error if voter casts a vote for second time", async () => {
          const candidateIdToVote = 1;
          await voting.castVote(candidateIdToVote);

          await expect(voting.castVote(2)).to.be.revertedWithCustomError(voting, "Voting__AlreadyCastedVote");
        });
      });

      describe("cast vote", () => {
        it("Emits VoteCasted event", async () => {
          const [deployer] = await ethers.getSigners();
          await expect(voting.castVote(2)).to.emit(voting, "VoteCasted").withArgs(deployer.address, 2, "Donald Trump", "Republican Party");
        });

        it("updates vote count of the candidate correctly", async () => {
          const [deployer, addr1, addr2] = await ethers.getSigners();
          const candidateId1 = 1;
          const candidateId2 = 2;
          let voteCountForId1 = 0;
          let voteCountForId2 = 0;

          const candidatesDetailsBeforeVoting = await voting.getCandidatesDetails();
          const candidateBeforeVoting = candidatesDetailsBeforeVoting.find((candidate) => candidate.id == candidateId2);
          assert.equal(Number(candidateBeforeVoting.count), voteCountForId2);

          await voting.castVote(candidateId2);
          voteCountForId2++;

          const candidatesDetailsAfterFirstVote = await voting.getCandidatesDetails();
          const candidateAfterFirstVote = candidatesDetailsAfterFirstVote.find((candidate) => candidate.id == candidateId2);
          assert.equal(Number(candidateAfterFirstVote.count), voteCountForId2);

          await voting.connect(addr1).castVote(candidateId2);
          voteCountForId2++;

          const candidatesDetailsAfterSecondVote = await voting.getCandidatesDetails();
          const candidateAfterSecondVote = candidatesDetailsAfterSecondVote.find((candidate) => candidate.id == candidateId2);
          assert.equal(Number(candidateAfterSecondVote.count), voteCountForId2);

          await voting.connect(addr2).castVote(candidateId1);
          voteCountForId1++;

          const candidatesDetailsAfterThirdVote = await voting.getCandidatesDetails();
          const candidateAfterThirdVote = candidatesDetailsAfterThirdVote.find((candidate) => candidate.id == candidateId1);
          assert.equal(Number(candidateAfterThirdVote.count), voteCountForId1);
        });

        it("checks if voter's hasVoted status has changed to true", async () => {
          const candidateToVote = 1;
          await voting.castVote(candidateToVote);
          const hasCandidateVoted = await voting.getIsVotedCandidate();
          expect(await hasCandidateVoted).to.be.true;
        });
      });

      describe("Emits WinnerSelected", () => {
        it("checks is WinnerSelected event is emitted", async () => {
          const startTime = 1722067032;
          const endTime = Math.floor(Date.now() / 1000) + 20;
          const candidateIDToVote = 2;
          let { name, party, image, count } = candidates.find((candidate) => candidate.id === candidateIDToVote);

          const votingContract = await ethers.deployContract("Voting", [candidates, startTime, endTime]);
          await votingContract.waitForDeployment();

          await votingContract.castVote(candidateIDToVote);
          count++;

          await time.increase(20);
          const upkeepNeeded = await votingContract.checkUpkeep("0x");

          expect(upkeepNeeded[0]).to.be.true;
          await expect(votingContract.performUpkeep("0x"))
            .to.emit(votingContract, "WinnerSelected")
            .withArgs(candidateIDToVote, name, party, image, count);
        });
      });
    });
