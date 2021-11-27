const BN = web3.utils.BN;
const GuessNumber = artifacts.require("GuessNumber");
const LuckyNumberToken = artifacts.require("LuckyNumberToken");

const getErrorTxHash = error => Object.keys(error)[0];

const createGuessingGames = async (guessGames, instance, owner) => {
  for (gs of guessGames) {
    await instance.createGuessingNumberGame(gs, { from: owner });
  }
};

contract("GuessNumber", function (accounts) {
  const [owner, player] = accounts;
  let luckyNumberTokenInstance;
  let instance;

  beforeEach(async () => {
    instance = await GuessNumber.new();
  });

  it("should if owner account is actually owner - OpenZeppelin Ownable contract implementation", async () => {
    assert.strictEqual(await instance.owner(), owner);
  });

  it("should return true if owner call isTheOwner and false if it is not owner", async () => {
    assert.strictEqual(await instance.isTheOwner({ from: owner }), true);
    assert.strictEqual(await instance.isTheOwner({ from: player }), false);
  });

  it("should not be able to set number that is not between 1 to 10", async () => {
    assert.strictEqual(await instance.isTheOwner({ from: owner }), true);
    assert.strictEqual(await instance.isTheOwner({ from: player }), false);
  });

  it("should return 0 of available games", async () => {
    const numberOfAvailableGames = await instance.getNumberOfAvailableGames();
    assert.equal(numberOfAvailableGames, 0);
  });

  it("should return number of available games", async () => {
    await createGuessingGames([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], instance, owner);

    const numberOfAvailableGames = await instance.getNumberOfAvailableGames();
    assert.equal(numberOfAvailableGames, 10);
  });

  it("should not allow owner to guess the numbers", async () => {
    try {
      await instance.createGuessingNumberGame(21, { from: owner });
    } catch (e) {
      const { error, reason } = e.data[getErrorTxHash(e.data)];
      assert.equal(error, "revert");
      assert.equal(reason, "Number must be between 1 and 10");
    }
  });

  it("should fail to guess the number as a player because there are not more the 5 games", async () => {
    await createGuessingGames([1, 2], instance, owner);

    try {
      await instance.guessTheNumber(1, { from: player });
    } catch (e) {
      const { error, reason } = e.data[getErrorTxHash(e.data)];
      assert.equal(error, "revert");
      assert.equal(reason, "Game is not ready to be played");
    }
  });

  it("should be able to play, guess the number and receive lucky number token", async () => {
    await createGuessingGames([1, 1, 1, 1, 1, 1], instance, owner);

    const startBalance = await instance.getLuckyNumberTokenBalance(player);

    let eventEmitted = false;

    const playedTx = await instance.guessTheNumber(1, { from: player });

    if (playedTx.logs[0].event == "GuessingNumberSuccess") {
      eventEmitted = true;
    }

    assert.equal(eventEmitted, true, "Successfully guessed the number so emit GuessingNumberSuccess event");

    const endBalance = await instance.getLuckyNumberTokenBalance(player);

    assert.equal(
      new BN(endBalance).toString(), new BN(startBalance).add(new BN(500)).toString(), 
      "Player receive lucky number token after successfully guessing number");
  });

  it("should be able to play, fail to guess the number and not receive the lucky number token", async () => {
    await createGuessingGames([1, 1, 1, 1, 1, 1], instance, owner);

    const startBalance = await instance.getLuckyNumberTokenBalance(player);

    let eventEmitted = false;

    const playedTx = await instance.guessTheNumber(2, { from: player });

    if (playedTx.logs[0].event == "GuessingNumberFailed") {
      eventEmitted = true;
    }

    assert.equal(eventEmitted, true, "Failed to guess the number so emit GuessingNumberFailed event");

    const endBalance = await instance.getLuckyNumberTokenBalance(player);

    assert.equal(
      new BN(endBalance).toString(), new BN(startBalance).toString(), 
      "Player should not receive lucky number token after failed to guessed the number");
  });

  it("should be able to play, guess the number and if there are no more the 5 games next time will fail", async () => {
    await createGuessingGames([1, 1, 1, 1, 1, 1], instance, owner);

    let eventEmitted = false;

    const playedTx = await instance.guessTheNumber(1, { from: player });

    if (playedTx.logs[0].event == "GuessingNumberSuccess") {
      eventEmitted = true;
    }

    assert.equal(eventEmitted, true, "Successfully guessed the number so emit GuessingNumberSuccess event");

    try {
      await instance.guessTheNumber(1, { from: player });
    } catch (e) {
      const { error, reason } = e.data[getErrorTxHash(e.data)];
      assert.equal(error, "revert");
      assert.equal(reason, "Game is not ready to be played");
    }
  });

  it("should be able to play, guess the numbers and check the number of winnings", async () => {
    await createGuessingGames([1, 1, 1, 1, 1, 1, 1], instance, owner);

    let eventEmitted1 = false;
    let eventEmitted2 = false;

    const playedTx1 = await instance.guessTheNumber(1, { from: player });
    const playedTx2 = await instance.guessTheNumber(1, { from: player });

    if (playedTx1.logs[0].event == "GuessingNumberSuccess") {
      eventEmitted1 = true;
    }

    if (playedTx2.logs[0].event == "GuessingNumberSuccess") {
      eventEmitted2 = true;
    }

    assert.equal(eventEmitted1, true, "Successfully guessed the number so emit GuessingNumberSuccess event");
    assert.equal(eventEmitted2, true, "Successfully guessed the number so emit GuessingNumberSuccess event");

    const numberOfWinningsTx = await instance.getNumberOfPlayerWinnings({ from: player });

    assert.equal(numberOfWinningsTx, 2);
  });

  it("should be able to play, guess the numbers and check the number of losses", async () => {
    await createGuessingGames([1, 1, 1, 1, 1, 1, 1], instance, owner);

    let eventEmitted1 = false;
    let eventEmitted2 = false;

    const playedTx1 = await instance.guessTheNumber(2, { from: player });
    const playedTx2 = await instance.guessTheNumber(2, { from: player });

    if (playedTx1.logs[0].event == "GuessingNumberFailed") {
      eventEmitted1 = true;
    }

    if (playedTx2.logs[0].event == "GuessingNumberFailed") {
      eventEmitted2 = true;
    }

    assert.equal(eventEmitted1, true, "Failed to guess the number so emit GuessingNumberFailed event");
    assert.equal(eventEmitted2, true, "Failed to guess the number so emit GuessingNumberFailed event");

    const numberOfLossesTx = await instance.getNumberOfPlayerLosses({ from: player });

    assert.equal(numberOfLossesTx, 2);
  });
});