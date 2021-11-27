const BN = web3.utils.BN;
const LuckyNumberToken = artifacts.require("LuckyNumberToken");

const getErrorTxHash = error => Object.keys(error)[0];

contract("LuckyNumberToken", function (accounts) {
  let luckyNumberTokenInstance;
  const [owner, player] = accounts;

  beforeEach(async () => {
    luckyNumberTokenInstance = await LuckyNumberToken.deployed({ from: owner });
  });

  it("owner should have permissions to mint lucky number tokens", async function () {
    const startBalance = await luckyNumberTokenInstance.balanceOf(player);
    
    await luckyNumberTokenInstance.mint(player, 500, { from: owner });

    const endBalance = await luckyNumberTokenInstance.balanceOf(player);
    assert.equal(
      new BN(endBalance).toString(), new BN(startBalance).add(new BN(500)).toString(), 
      "Owner of lucky number token should transfer 500 LNT");
  });

  it("player should not have permissions to mint lucky number tokens", async function () {
    const startBalance = await luckyNumberTokenInstance.balanceOf(owner);

    try {
      await luckyNumberTokenInstance.mint(owner, 500, { from: player });
    } catch(e) {
      const { error, reason } = e.data[getErrorTxHash(e.data)];
      assert.equal(error, "revert");
      assert.equal(reason, "Caller is not a minter");
    }

    const endBalance = await luckyNumberTokenInstance.balanceOf(owner);
    assert.equal(
      new BN(endBalance).toString(), new BN(startBalance).toString(), 
      "Owner balance should be the same because player can not transfer lucky number tokens");
  });
})