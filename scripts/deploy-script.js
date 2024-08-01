const { ethers } = require("hardhat");

const main = async () => {
  const candidates = [];
  const startTime = 0;
  const endTime = 0;
  const args = [candidates, startTime, endTime];

  const [deployer, addr1, addr2, addr3] = ethers.getSigners();

  const voting = await ethers.deployContract("Voting", args);
  await voting.waitForDeployment();

  console.log("----- Candidates details before voting -----");
  const candidateDetails = await voting.getCandidateDetails();
  console.log(candidateDetails);
  console.log("--------------------------------------------");

  await voting.castVote(1);
  await voting.connect(addr1).castVote(2);
  await voting.connect(addr2).castVote(1);
  await voting.connect(addr3).castVote(1);

  console.log("----- Candidates details after voting -----");
  const candidateDetailsAfterVoting = await voting.getCandidateDetails();
  console.log(candidateDetailsAfterVoting);
  console.log("--------------------------------------------");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
