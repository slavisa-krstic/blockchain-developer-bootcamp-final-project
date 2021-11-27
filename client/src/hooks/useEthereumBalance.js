import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useAppContext } from '../context/AppContext';
import { formatEther } from '@ethersproject/units';

export const useEthereumBalance = () => {
  const { active, library, account } = useWeb3React();
  const { setEthereumBalance, ethereumBalance } = useAppContext();

  const getEthereumBalance = async () => {
    if (library && active && account) {
      const balance = await library.getBalance(account);
      setEthereumBalance(parseFloat(formatEther(balance)).toPrecision(4));
    } else {
      setEthereumBalance('-');
    }
  };

  useEffect(() => {
    if (account && active) {
      getEthereumBalance();
    } else {
      setEthereumBalance("-");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, active]);

  return {
    ethereumBalance
  };
};