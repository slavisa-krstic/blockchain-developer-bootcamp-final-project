import React, { createContext, useReducer } from 'react';

const defaultContext = {
  ethereumBalance: '-',
  setEthereumBalance: () => {},

  luckyNumberTokenBalance: '-',
  setLuckyNumberTokenBalanceBalance: () => {},

  numberOfWinnings: '-',
  setNumberOfWinnings: () => {},

  numberOfLosses: '-',
  setNumberOfLosses: () => {},

  isTheOwner: false,
  setIsTheOwner: () => {},

  numberOfAvailableGames: 0,
  setNumberOfAvailableGames: () => {},

  applicationError: undefined,
  setApplicationError: () => {},
}

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_ETHEREUM_BALANCE':
      return {
        ...state,
        ethereumBalance: payload,
      };
    case 'SET_LUCKY_NUMBER_TOKEN_BALANCE':
      return {
        ...state,
        luckyNumberTokenBalance: payload,
      };
    case 'SET_NUMBER_OF_WINNINGS':
      return {
        ...state,
        numberOfWinnings: payload,
      };
    case 'SET_NUMBER_OF_LOSSES':
      return {
        ...state,
        numberOfLosses: payload,
      };
    case 'SET_IS_THE_OWNER': 
      return {
        ...state,
        isTheOwner: payload,
      };
    case 'SET_NUMBER_OF_AVAILABLE_GAMES': 
      return {
        ...state,
        numberOfAvailableGames: payload,
      };
    case 'SET_APPLICATION_ERROR':
      return {
        ...state,
        applicationError: payload,
      };
    default:
      return state;
  }
}

const AppContext = createContext(defaultContext);

export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(appReducer, defaultContext);

  const contextValue = {
    ethereumBalance: store.ethereumBalance,
    setEthereumBalance: (balance) => {
      dispatch({ type: 'SET_ETHEREUM_BALANCE', payload: balance });
    },
    luckyNumberTokenBalance: store.luckyNumberTokenBalance,
    setLuckyNumberTokenBalance: (balance) => {
      dispatch({ type: 'SET_LUCKY_NUMBER_TOKEN_BALANCE', payload: balance });
    },
    numberOfWinnings: store.numberOfWinnings,
    setNumberOfWinnings: (numb) => {
      dispatch({ type: 'SET_NUMBER_OF_WINNINGS', payload: numb });
    },
    numberOfLosses: store.numberOfLosses,
    setNumberOfLosses: (numb) => {
      dispatch({ type: 'SET_NUMBER_OF_LOSSES', payload: numb });
    },
    isTheOwner: store.isTheOwner,
    setIsTheOwner: (isOwner) => {
      dispatch({ type: 'SET_IS_THE_OWNER', payload: isOwner });
    },
    numberOfAvailableGames: store.numberOfAvailableGames,
    setNumberOfAvailableGames: (numb) => {
      dispatch({ type: 'SET_NUMBER_OF_AVAILABLE_GAMES', payload: numb });
    },
    applicationError: store.applicationError,
    setApplicationError: (str) => {
      dispatch({ type: 'SET_APPLICATION_ERROR', payload: str });
    }
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}