import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'

import SendIcon from "@material-ui/icons/Send";

// Hooks
import { useConnectNetwork } from './../../hooks/useConnectNetwork';
import { useLuckyNumberToken } from './../../hooks/useLuckyNumberToken';
import { useEthereumBalance } from './../../hooks/useEthereumBalance';
import { useGuessNumberGame } from './../../hooks/useGuessNumberGame';

// Styles
import useStyles from "./styles";

const GuessNumber = () => {
  const classes = useStyles();

  const {
    guessNumber,
    setGuessNumber,
    playGuessNumberGame,
    numberOfAvailableGames,
    numberOfWinnings,
    numberOfLosses,
    refresh,
    waitingTx
  } = useGuessNumberGame();

  const {
    account,
  } = useConnectNetwork();

  const {
    luckyNumberTokenBalance
  } = useLuckyNumberToken(refresh);

  const {
    ethereumBalance
  } = useEthereumBalance();

  const canPlay = numberOfAvailableGames > 5 && guessNumber !== "-";

  return (
    <Box>
      <div>Address: {account}</div>
      <div>ETH: {ethereumBalance}</div>
      <div>Lucky number token (LNT): {luckyNumberTokenBalance}</div>
      <div>Number of winnings: {numberOfWinnings}</div>
      <div>Number of losses: {numberOfLosses}</div>
      <Box>
        <Container maxWidth="sm" className={classes.guessNumber}>
          <label>{guessNumber}</label>
          </Container>
          <Container maxWidth="sm" className={classes.guessButtons}>
            <Button variant="contained" onClick={() => setGuessNumber(1)}>1</Button>
            <Button variant="contained" onClick={() => setGuessNumber(2)}>2</Button>
            <Button variant="contained" onClick={() => setGuessNumber(3)}>3</Button>
            <Button variant="contained" onClick={() => setGuessNumber(4)}>4</Button>
            <Button variant="contained" onClick={() => setGuessNumber(5)}>5</Button>
            <Button variant="contained" onClick={() => setGuessNumber(6)}>6</Button>
            <Button variant="contained" onClick={() => setGuessNumber(7)}>7</Button>
            <Button variant="contained" onClick={() => setGuessNumber(8)}>8</Button>
            <Button variant="contained" onClick={() => setGuessNumber(9)}>9</Button>
            <Button variant="contained" onClick={() => setGuessNumber(10)}>10</Button>
          </Container>
          <Container maxWidth="sm" className={classes.guessSendButtons}>
            <Button 
              variant="contained" 
              endIcon={<SendIcon />}
              disabled={!canPlay || waitingTx}
              onClick={() => playGuessNumberGame()}
            > 
              Send Guessing 
            </Button>
        </Container>
        {!canPlay && <Container maxWidth="sm" className={classes.guessSendButtons}>
          {numberOfAvailableGames > 5 && guessNumber === "-" &&<Box className={classes.canNotPlay}>Please select your number</Box>}
          {numberOfAvailableGames < 6 && <Box className={classes.canNotPlay}>Waiting for organizer to create more games!!!</Box>}
        </Container>}
      </Box>
    </Box>
  );
};

export default GuessNumber;