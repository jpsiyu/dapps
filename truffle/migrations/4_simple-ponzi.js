const SimplePonzi = artifacts.require('../contracts/SimplePonzi.sol')

module.exports = function (deployer) {
  deployer.deploy(SimplePonzi);
};
