# Final project - Guess the number game
# blockchain-developer-bootcamp-final-project
Consensys Academy - Blockchain developer bootcamp final project - Slaviša Krstić

Contact email address: slavisa.krstic@endava.com

Contact discord username / email: slavisa.krstic#6923 / slavisa.krstic@endava.com

# Idea - About the game
Guess the number is simple game. Owner of the games set numbers and the players can start guessing. For players to be able to play the game owner must create more the 5 games. In that way there is no way for player to predict number and guess them based on a data inside the contract. Players can see number of winnings and losses. When the players successfully guess the number, she/he will receive lucky number tokens (LNT).

## Deployed version url:

https://slavisa-krstic.github.io/blockchain-developer-bootcamp-final-project/

## How to run this project locally:
### Prerequisites

- Node.js >= v14
- npm >= ^7
- yarn >= ^1.16.0
- Truffle and Ganache
- Npm and Yarn
- `git checkout main`
- Metamask installed

### Contracts

- `npm install` in project root folder install smart contract dependencies
- `truffle build` - build smart contract
- `truffle test` - run smart contract unit test
- `ganache-cli --networkId 1337` - run local network on port `8545`
- `truffle migrate --network develop` - deploy contracts on local network
-  network id is `1337`, port `8545`, use same network id in Metamask

### Contract deployment
Guess Number dApp uses `Ropsten` test network. In order to deploy contract to `Ropsten`: 

- Metamask installed and mnemonic saved
- Obtain ropsten test eth
- Open infura account and create project
- populate .env file with following variables

- WALLET_MNEMONIC=your mnemonic from metamask
- INFURA_PROJECT_ID=infura project id
- OWNER_ID=account on ropsten that will be owner of the contracts

- `truffle migrate --network ropsten` - this command will deploy contracts to ropsten network

### Frontend

- `cd client`
- `cp -r build/contracts/ client/src/` - copy contract (after building contract) from `build/contracts` into `client/src/contracts` - on manual without bash command
- `yarn install`
- `yarn start`
- `http://localhost:3000` or `http://localhost:3000/blockchain-developer-bootcamp-final-project` - open app in browser.
- Metamask installed. Account that is used to deploy contract (owner) is `game owner` other accounts are `players`

## Directory structure

- `client`: React frontend application.
- `contracts`: Smart contracts that are deployed in the Ropsten testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.

## Owner view "Production" - Game organizer - Create guess number games

https://user-images.githubusercontent.com/91070375/143722359-575cdbb4-7792-4d98-b068-00cb8b125619.mp4

## Player view "Production" - Playing guess number game

https://user-images.githubusercontent.com/91070375/143722366-86c210d3-a610-4891-86ec-0ecd48c77ef3.mp4

## Owner view "Local" - Game organizer - Create guess number games

https://user-images.githubusercontent.com/91070375/143723548-1643b470-dcab-40c1-9a33-92bf252226d2.mp4

## Player view "Local" - Playing guess number game

https://user-images.githubusercontent.com/91070375/143723560-0628a8eb-ae2e-4a9a-870c-22b92372e6c1.mp4

## Build screenshots (local/develop):
![Alt text](images/build.png?raw=true "build")

## Test screenshots:
![Alt text](images/test.png?raw=true "test")

## Deploy screenshots (local/develop):
![Alt text](images/deploy.png?raw=true "deploy")

## Simple workflow - owner

1. Choose contract owner account in metamask
2. Choose number and create a new game
3. Game number increases
4. For players to be able to play game more then 5 games are needed  

## Simple workflow - player

1. Open application / game web address
2. Connect account with Metamask (connect)
3. Choose number and press `send guessing`
4. Game outcome is calculated and visible (number of winnings / losses is changed) and for winning players is rewarded with 500 Lucky Number Tokens (LNT).
