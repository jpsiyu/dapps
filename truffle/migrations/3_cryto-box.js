const CrytoBox = artifacts.require('../contracts/CrytoBox.sol')

module.exports = function (deployer) {
  deployer.deploy(CrytoBox);
};
