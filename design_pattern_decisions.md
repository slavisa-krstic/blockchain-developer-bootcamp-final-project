# Design patterns used

## Access Control Design Patterns

- `Ownable` design pattern used in the functions functions and some game can be create only by owner of the contract. `createGuessingNumberGame` is able to called only by owner and it is protected by `Ownable` design pattern. `guessTheNumber` can not be called by owner because owner is the one who set the games. It must be 5 available games created by owner so players can start guessing the number.

- AccessControl contract is used on `LuckyNumberToken` contract to implement role based access control.

- Role such as MINTER_ROLE are defined on `LuckyNumberToken`.

## Inheritance and Interfaces

- `GuessNumber` contract inherits the `Ownable` contract from OpenZeppelin to enable ownership for game owner and players.

- `LuckyNumberToken` contract inherits the OpenZeppelin `Context`, `AccessControl`, `ERC20` contracts.

- `Context` - define `_msgSender` view function.

## Commit pattern
- `GuessNumber` owner set few games (more then 5) so players can start playing. When player send a number in a random way games is choosen from array of games (because of that more then 5 games are needed so user can not "hack" the system). When player "commit" / submit a number in a random way it is choosen between games and select one games to compare with given number

## Inter-Contract Execution
- When game guessing is determined `GuessNumber` calls mint function of the `LuckyNumberToken` contract and winner is reworded with 500 `LNT`.