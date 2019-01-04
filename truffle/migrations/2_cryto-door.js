const CrytoDoor = artifacts.require('../contracts/CrytoDoor.sol')

module.exports = function(deployer) {
  deployer.deploy(CrytoDoor);
};
