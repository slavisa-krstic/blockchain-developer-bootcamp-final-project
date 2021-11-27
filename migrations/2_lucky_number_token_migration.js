const LuckyNumberToken = artifacts.require("./LuckyNumberToken.sol");

module.exports = function (deployer) {
  deployer.deploy(LuckyNumberToken);
};