// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./LuckyNumberToken.sol";

contract GuessNumber is Ownable {
  /// @notice counter to keep track how many games exist
  /// @dev used to store how many games are created
  uint gameCounter;

  /// @dev address of operator that create a games
  address public guessNumberOperator;

  /// @dev lucky number token
  LuckyNumberToken private luckyNumberToken;
  
  /// @dev enum that defines state of the games
  enum GuessNumberState {
    GUESSING_NUMBER_CREATE_GAME,
    GUESSING_FINISHED_SUCCESS,
    GUESSING_FINISHED_FAILED
  }

  /// @dev struct that describe game
  struct GuessNumberGame {
    address guessNumberPlayer;
    uint numberToBeGuessed;
    uint guessNumber;
    GuessNumberState gameState;
  }

  mapping(uint => GuessNumberGame) private guessNumberGames;
  uint[] private games;

  /// @notice modifier to check that owner can not guess the game
  modifier isNotOwner() {
    require(guessNumberOperator != msg.sender, "Owner of the game can not guess the numbers");
    _;
  }

  /// @notice modifier to check if it is possible to play game
  modifier isGameAvailable() {
    // System must have more that a 5 games ready to be played
    require(games.length > 5, "Game is not ready to be played");
    _;
  }

  /// @notice modifier to check if number to be guessed is in a range between 1 and 10
  modifier checkTheNumber(uint _numberToBeGuessed) {
    require(_numberToBeGuessed > 0 && _numberToBeGuessed < 11, "Number must be between 1 and 10");
    _;
  }

  /// @notice emited when new game is created
  /// @dev emited when new game is created
  /// @param operator address of operator
  event GuessingNumberGameAdd(address operator);

  /// @notice emited when player succeed to guess the number
  /// @dev emited when player succeed to guess the number
  /// @param player address of player that missed the number
  event GuessingNumberSuccess(address player);

  /// @notice emited when player missed the number
  /// @dev emited when player missed the number
  /// @param player address of player that missed the number
  event GuessingNumberFailed(address player);

  constructor() {
    guessNumberOperator = owner();
    luckyNumberToken = new LuckyNumberToken();
  }

  function isTheOwner() public view returns (bool) {
    if (msg.sender != guessNumberOperator) {
      return false;
    }

    return true;
  }

  /// @notice Create new guessing number game and set initial state
  /// @param _numberToBeGuessed number that user should guess
  /// @dev create and add new game into list of games with submitted number
  function createGuessingNumberGame(uint _numberToBeGuessed) public onlyOwner checkTheNumber(_numberToBeGuessed) {
    // Set data of the game
    guessNumberGames[gameCounter].gameState = GuessNumberState.GUESSING_NUMBER_CREATE_GAME;
    guessNumberGames[gameCounter].numberToBeGuessed = _numberToBeGuessed;
    
    // Set game counter
    games.push(gameCounter);
    gameCounter = gameCounter + 1;
    // Add new game that is available to be played

    // Publish event that new game has been added
    emit GuessingNumberGameAdd(guessNumberOperator);
  }

  /// @notice Create new guessing number game and set initial state
  /// @param _numberGuessed number that user should guess
  /// @dev create and add new game into list of games with submitted number
  function guessTheNumber(uint _numberGuessed) public isGameAvailable() isNotOwner() returns (bool) {
    // Find first available game
    // If game doesn't exist transaction will be revertted
    uint index = findNextGame();
    
    // played game
    guessNumberGames[index].guessNumberPlayer = msg.sender;
    guessNumberGames[index].guessNumber = _numberGuessed;

    // Check if player successfully guessed the 
    if (guessNumberGames[index].guessNumber == guessNumberGames[index].numberToBeGuessed) {
      guessNumberGames[index].gameState = GuessNumberState.GUESSING_FINISHED_SUCCESS;
      luckyNumberToken.mint(msg.sender, 500);
      emit GuessingNumberSuccess(msg.sender);
      return true;
    }
      
    // Game is lost, set player 
    guessNumberGames[index].gameState = GuessNumberState.GUESSING_FINISHED_FAILED;
    emit GuessingNumberFailed(msg.sender);
    return false;
  }
  
  /// @notice Get number of winnings
  /// @dev Get number of winnings base on sender address
  function getNumberOfPlayerWinnings() public view returns (uint) {
    uint numberOfWinnings = 0;
    for (uint i = 0; i < gameCounter; i++) {
      if (guessNumberGames[i].guessNumberPlayer == msg.sender && guessNumberGames[i].gameState == GuessNumberState.GUESSING_FINISHED_SUCCESS) {
        numberOfWinnings++;
      }
    }

    return numberOfWinnings;
  }

  /// @notice Get number of losses
  /// @dev Get number of losses base on sender address
  function getNumberOfPlayerLosses() public view returns (uint) {
    uint numberOfLosses = 0;
    for (uint i = 0; i < gameCounter; i++) {
      if (guessNumberGames[i].guessNumberPlayer == msg.sender && guessNumberGames[i].gameState == GuessNumberState.GUESSING_FINISHED_FAILED) {
        numberOfLosses++;
      }
    }

    return numberOfLosses;
  }

  /// @notice Create "Random number" to get game from array
  /// @dev create not really random number - For real random number use Oracle implement "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
  function notReallyRandom() private view returns (uint256) {
    return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
  }

  /// @notice Remove element from array based on provided index
  /// @param index index that should be removed from array
  function remove(uint index) private {
    games[index] = games[games.length - 1];
    games.pop();
  }

  /// @notice Get number of losses
  /// @dev Get number of losses base on sender address
  function findNextGame() private returns (uint) {
    // Find available game
    uint numbOfGames = games.length - 1;

    // DEMO Find random number between 0 and number of games
    uint random = notReallyRandom() % numbOfGames;

    // Just in case if something happen odd with random function set next games to first in a row
    // Never should happen
    if (random > numbOfGames) {
      random = 0;
    }

    // Get demo random number
    uint nextGameIndex = games[random];
    remove(random);

    return nextGameIndex;
  }

  /// @notice Get lucky number token balance
  /// @dev Based on provided address get lucky token balance
  function getLuckyNumberTokenBalance(address _address) public view returns (uint) {
    return luckyNumberToken.balanceOf(_address);
  }

  /// @notice Get count of available games
  /// @dev Get count of available games from the games
  function getNumberOfAvailableGames() public view returns (uint) {
    return games.length;
  }
}