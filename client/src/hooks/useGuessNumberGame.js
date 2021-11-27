import { useEffect, useState } from 'react';
import { useEthContract } from './useEthContract';
import { useWeb3React } from '@web3-react/core';
import { AddressZero } from '@ethersproject/constants';

// Guess number contract
import GuessNumber from '../contracts/GuessNumber.json';

// Application context
import { useAppContext } from '../context/AppContext';

export const useGuessNumberGame = () => {
  const { account, chainId, active } = useWeb3React();
  const [guessNumber, setGuessNumber] = useState('-');
  const [refresh, setRefresh] = useState(0);
  const [waitingTx, setWaitingTx] = useState(false);

  const address = GuessNumber.networks && GuessNumber.networks[chainId] ? 
    GuessNumber.networks[chainId].address : 
    AddressZero;

  const guessNumberContract = useEthContract(address, GuessNumber.abi);
    
  const { 
    setNumberOfWinnings, numberOfWinnings,
    setNumberOfLosses, numberOfLosses,
    setIsTheOwner, isTheOwner,
    setNumberOfAvailableGames, numberOfAvailableGames,
    setApplicationError
  } = useAppContext();

  const getNumberOfWinnings = async () => {
    try {
      const numb = await guessNumberContract.getNumberOfPlayerWinnings();
      setNumberOfWinnings(Number(numb));
    } catch (error) {
      setNumberOfWinnings('-');
    }
  };

  const getNumberOfLosses = async () => {
    try {
      const numb = await guessNumberContract.getNumberOfPlayerLosses();
      setNumberOfLosses(Number(numb));
    } catch (error) {
      setNumberOfLosses('-');
    }
  };

  const getIsTheOwner = async () => {
    try {
      const isOwner = await guessNumberContract.isTheOwner();
      setIsTheOwner(Boolean(isOwner));
    } catch (error) {
      setIsTheOwner(false);
    }
  };

  const getNumberOfAvailableGames = async () => {
    try {
      const numb = await guessNumberContract.getNumberOfAvailableGames();
      setNumberOfAvailableGames(Number(numb));
    } catch (error) {
      setNumberOfAvailableGames('-');
    }
  };

  const createNewGuessNumberGame = async () => {
    try {
      setWaitingTx(true);
      const result = await guessNumberContract.createGuessingNumberGame(guessNumber);
      await result.wait(1);
      setWaitingTx(false);
      setApplicationError("");
      setGuessNumber('-');
      setRefresh(refresh + 1);
    } catch (error) {
      setGuessNumber(guessNumber);
      setWaitingTx(false);
      setApplicationError("Error executing 'creating guess game' transaction. Try again (raise gas price).");
    }
  }

  const playGuessNumberGame = async () => {
    try {
      setWaitingTx(true);
      const result = await guessNumberContract.guessTheNumber(guessNumber);
      await result.wait(1);
      setWaitingTx(false);
      setApplicationError("");
      setGuessNumber('-');
      setRefresh(refresh + 1);
    } catch (error) {
      setGuessNumber(guessNumber);
      setWaitingTx(false);
      setApplicationError("Error executing 'play guess game' transaction. Try again (raise gas price).");
    }
  }

  useEffect(() => {
    if (account && active) {
      getNumberOfWinnings();
    } else {
      setNumberOfWinnings('-');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, active, refresh]);

  useEffect(() => {
    if (account && active) {
      getNumberOfLosses();
    } else {
      setNumberOfLosses('-');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, active, refresh]);

  useEffect(() => {
    if (account && active) {
      getIsTheOwner();
    } else {
      setIsTheOwner(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, active, refresh]);

  useEffect(() => {
    if (account && active) {
      getNumberOfAvailableGames();
    } else {
      setNumberOfAvailableGames('-');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, active, refresh]);

  return {
    numberOfWinnings,
    numberOfLosses,
    isTheOwner,
    numberOfAvailableGames,
    setGuessNumber,
    guessNumber,
    createNewGuessNumberGame,
    playGuessNumberGame,
    refresh,
    waitingTx
  };
};