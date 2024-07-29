const { assert, expect } = require("chai");
const { network, ethers, deployments, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Voting", () => {
      let voting;
      let deployer;
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
      1722255547502;
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
      });
    });
