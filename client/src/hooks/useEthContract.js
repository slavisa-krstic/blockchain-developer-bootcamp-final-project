// React
import { useMemo } from 'react';

// ETH
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';

export function useEthContract(contractAddress, ABI) {
  const { library, account } = useWeb3React();

  let provider = library
  if (account) {
    provider = library.getSigner(account).connectUnchecked()
  }

  return useMemo(() => {
    return new Contract(contractAddress, ABI, provider);
  }, [contractAddress, ABI, provider]);
}