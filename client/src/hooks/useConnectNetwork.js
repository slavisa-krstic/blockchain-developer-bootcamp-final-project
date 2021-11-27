import { useEffect} from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import { useAppContext } from '../context/AppContext';
import { InjectedConnector } from '@web3-react/injected-connector';

export const useConnectNetwork = () => {
  const { activate, active, account, deactivate } = useWeb3React();
  const { setApplicationError } = useAppContext();

  const injected = new InjectedConnector({ supportedChainIds: [1, 3, 1337] });

  useEffect(() => {
    if (!window.ethereum) {
      setApplicationError("Metamask is not installed. Please install it to be able to start the game");
      return;
    }
  }, [setApplicationError]);

  const connect = () => {
    if (!window.ethereum) {
      setApplicationError("Metamask is not installed. Please install it to be able to start the game");
      return;
    }
    activate(injected, (e) => {
      if (e instanceof UnsupportedChainIdError) {
        setApplicationError('Network is not supported');
      }
    })
  }

  return {
    activate, 
    active,
    account,
    deactivate,
    connect,
  };
};