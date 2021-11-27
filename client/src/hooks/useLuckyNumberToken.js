import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatUnits } from '@ethersproject/units';
import { AddressZero } from '@ethersproject/constants';

// Hooks
import { useEthContract } from './useEthContract';

// Guess number contract
import GuessNumber from '../contracts/GuessNumber.json';

// Application context
import { useAppContext } from '../context/AppContext';

export const useLuckyNumberToken = (refresh) => {
  const { account, chainId, active } = useWeb3React();
  const address = GuessNumber.networks && GuessNumber.networks[chainId] ? 
    GuessNumber.networks[chainId].address : 
    AddressZero;

  const guessNumberContract = useEthContract(address, GuessNumber.abi);
    
  const { setLuckyNumberTokenBalance, luckyNumberTokenBalance } = useAppContext();

  const getLuckyNumberTokenBalance = async () => {
    try {
      const tokenBalance = await guessNumberContract.getLuckyNumberTokenBalance(account);
      setLuckyNumberTokenBalance(formatUnits(tokenBalance, 8));
    } catch (error) {
      setLuckyNumberTokenBalance('-');
    }
  };

  useEffect(() => {
    if (account && active) {
      getLuckyNumberTokenBalance();
    } else {
      setLuckyNumberTokenBalance("-");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, active, refresh]);

  return {
    luckyNumberTokenBalance,
  };
};