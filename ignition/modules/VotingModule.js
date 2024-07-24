const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingModule", (m) => {
  const deployer = m.getAccount(0);
  const tokenOwner = m.getAccount(1);

  const voting = m.contract("Voting", [tokenOwner], {
    from: deployer,
  });

  return { voting };
});
