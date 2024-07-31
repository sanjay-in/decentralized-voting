const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const { developmentChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = getNamedAccounts;

  log("-----------------------------------------------------");
  log("Deploying Voting contract and waiting for confirmation");

  const candidates = [];
  const startTimestamp = 0;
  const endTimestamp = 0;
  const args = [candidates, startTimestamp, endTimestamp];

  const voting = await deploy("Voting", {
    from: deployer,
    args,
    logs: true,
    waitConfirmations: network.config.blockConfirmation || 1,
  });

  const votingAddress = voting.address;

  log(`Voting contract deployed at ${votingAddress}`);
  log("----------------------------------------------------");

  if (!developmentChains.includes(network.name)) {
    await verify(votingAddress, args);
  }
};

module.exports.tags = ["all", "voting"];
