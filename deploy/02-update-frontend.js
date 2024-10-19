const { deployments } = require("hardhat");
const fs = require("fs");
const ABIFilepath = "./client/constants/contractABI.json";
const contractAddressFilepath = "./client/constants/contractAddress.json";

module.exports = async () => {
  if (process.env.UPDATE_FRONTEND === "true") {
    const contract = await deployments.get("Voting");
    const ABI = contract.abi;
    const address = contract.address;

    fs.writeFileSync(ABIFilepath, JSON.stringify(ABI));
    fs.writeFileSync(contractAddressFilepath, JSON.stringify(address));
    console.log("Updated Frontend");
    console.log("..............................");
  }
};

module.exports.tags = ["all", "updateFrontend"];
