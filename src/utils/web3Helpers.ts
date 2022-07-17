import Web3 from 'web3';
import { addressBookByChainId, ChainId } from '../../packages/address-book/address-book';
import { BeefyFinance } from '../../packages/address-book/types/beefyfinance';

import { POLYGON_RPC, POLYGON_CHAIN_ID } from '../constants';

const MULTICALLS: Record<ChainId, Pick<BeefyFinance, 'multicall'>['multicall']> = {
  [ChainId.bsc]: addressBookByChainId[ChainId.bsc].platforms.beefyfinance.multicall,
  [ChainId.heco]: addressBookByChainId[ChainId.heco].platforms.beefyfinance.multicall,
  [ChainId.polygon]: addressBookByChainId[ChainId.polygon].platforms.beefyfinance.multicall,
  [ChainId.fantom]: addressBookByChainId[ChainId.fantom].platforms.beefyfinance.multicall,
  [ChainId.avax]: addressBookByChainId[ChainId.avax].platforms.beefyfinance.multicall,
  [ChainId.one]: addressBookByChainId[ChainId.one].platforms.beefyfinance.multicall,
  [ChainId.arbitrum]: addressBookByChainId[ChainId.arbitrum].platforms.beefyfinance.multicall,
  [ChainId.celo]: addressBookByChainId[ChainId.celo].platforms.beefyfinance.multicall,
  [ChainId.moonriver]: addressBookByChainId[ChainId.moonriver].platforms.beefyfinance.multicall,
  [ChainId.cronos]: addressBookByChainId[ChainId.cronos].platforms.beefyfinance.multicall,
  [ChainId.aurora]: addressBookByChainId[ChainId.aurora].platforms.beefyfinance.multicall,
  [ChainId.fuse]: addressBookByChainId[ChainId.fuse].platforms.beefyfinance.multicall,
  [ChainId.metis]: addressBookByChainId[ChainId.metis].platforms.beefyfinance.multicall,
  [ChainId.moonbeam]: addressBookByChainId[ChainId.moonbeam].platforms.beefyfinance.multicall,
  [ChainId.sys]: addressBookByChainId[ChainId.sys].platforms.beefyfinance.multicall,
  [ChainId.emerald]: addressBookByChainId[ChainId.emerald].platforms.beefyfinance.multicall,
  [ChainId.optimism]: addressBookByChainId[ChainId.optimism].platforms.beefyfinance.multicall,
};

const clients: Record<keyof typeof ChainId, Web3[]> = {
  polygon: [],
};

clients.polygon.push(new Web3(POLYGON_RPC));

export const chainRandomClients = {
  polygonRandomClient: () => clients.polygon[~~(clients.polygon.length * Math.random())],
};

export const _web3Factory = (chainId: ChainId) => {
  switch (chainId) {
    case POLYGON_CHAIN_ID:
      return chainRandomClients.polygonRandomClient();
  }
};

export const _multicallAddress = (chainId: ChainId) => MULTICALLS[chainId];
