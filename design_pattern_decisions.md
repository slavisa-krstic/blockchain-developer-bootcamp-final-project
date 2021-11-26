# Design patterns used

## Access Control Design Patterns

- `Ownable` design pattern used in the functions functions and some game can be create only by owner of the contract. `createGuessingNumberGame` is able to called only by owner and it is protected by `Ownable` design pattern. `guessTheNumber` can not be called by owner because owner is the one who set the games. It must be 5 available games created by owner so players can start guessing the number.

## Inheritance and Interfaces

- `GuessNumber` contract inherits the `Ownable` contract from OpenZeppelin to enable ownership for game owner and players.