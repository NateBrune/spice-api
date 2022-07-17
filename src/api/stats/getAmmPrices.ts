`use strict`;

import { fetchAmmPrices } from '../../utils/fetchAmmPrices';
import { fetchArrakisPrices } from '../../utils/fetchArrakisPrices';
//import { fetchDmmPrices } from '../../utils/fetchDmmPrices';

import { fetchCoinGeckoPrices } from '../../utils/fetchCoinGeckoPrices';
import { getKey, setKey } from '../../utils/redisHelper';

import getNonAmmPrices from './getNonAmmPrices';
///import polygonFarmPools from '../../data/matic/polygonFarmLpPools.json';
import arrakisMaticPools from '../../data/matic/arrakisPools.json';

const INIT_DELAY = 2 * 1000;
const REFRESH_INTERVAL = 5 * 60 * 1000;

// FIXME: if this list grows too big we might hit the ratelimit on initialization everytime
// Implement in case of emergency -> https://github.com/beefyfinance/beefy-api/issues/103
const pools = [...arrakisMaticPools];

const coinGeckoCoins = ['gelato', 'matic-network'];

const knownPrices = {
  BUSD: 1,
  USDT: 1,
  HUSD: 1,
  DAI: 1,
  USDC: 1,
  USDN: 1,
  cUSD: 1,
  asUSDC: 1,
};

let tokenPricesCache: Promise<any>;
let lpPricesCache: Promise<any>;
let lpBreakdownCache: Promise<any>;

const updateAmmPrices = async () => {
  console.log('> updating amm prices');
  let start = Date.now();
  try {
    const coinGeckoPrices = fetchCoinGeckoPrices(coinGeckoCoins);
    const arrakisPrices = fetchArrakisPrices(pools, knownPrices);

    const arrakis = await arrakisPrices;
    const cgPrices = await coinGeckoPrices;

    const allPrices = {
      ...arrakis.tokenPrices,
      ...cgPrices,
    };
    const allLPPrices = {
      ...arrakis.poolPrices,
    };
    const allBreakdowns = {
      ...arrakis.lpsBreakdown,
    };

    tokenPricesCache = allPrices;
    lpPricesCache = allLPPrices;
    lpBreakdownCache = allBreakdowns;

    return {
      tokenPricesCache,
      lpPricesCache,
      lpBreakdownCache,
    };
  } catch (err) {
    console.error(err);
  } finally {
    setTimeout(updateAmmPrices, REFRESH_INTERVAL);
    console.log(`> updated amm prices (${(Date.now() - start) / 1000}s)`);
    saveToRedis();
  }
};

export const getAmmTokensPrices = async () => {
  return await tokenPricesCache;
};

export const getAmmLpPrices = async () => {
  return await lpPricesCache;
};

export const getLpBreakdown = async () => {
  return await lpBreakdownCache;
};

export const getAmmTokenPrice = async tokenSymbol => {
  const tokenPrices = await getAmmTokensPrices();
  if (tokenPrices.hasOwnProperty(tokenSymbol)) {
    return tokenPrices[tokenSymbol];
  }
  console.error(`Unknown token '${tokenSymbol}'. Consider adding it to .json file`);
};

export const getAmmLpPrice = async lpName => {
  const lpPrices = await getAmmLpPrices();
  if (lpPrices.hasOwnProperty(lpName)) {
    return lpPrices[lpName];
  }
  //console.error(`Unknown liquidity pair '${lpName}'. Consider adding it to .json file`); //TODO: NATE FIX BY UPDATING GITHUB IN CONSTANTS
};

export const initPriceService = async () => {
  const tokenPrices = await getKey('TOKEN_PRICES');
  const lpPrices = await getKey('LP_PRICES');
  const lpBreakdown = await getKey('LP_BREAKDOWN');

  const init =
    // Flexible delayed initialization used to work around ratelimits
    new Promise((resolve, reject) => {
      setTimeout(resolve, INIT_DELAY);
    }).then(updateAmmPrices);

  tokenPricesCache =
    tokenPrices ?? init.then(({ tokenPrices, lpPrices, lpBreakdown }) => tokenPrices);
  lpPricesCache = lpPrices ?? init.then(({ tokenPrices, lpPrices, lpBreakdown }) => lpPrices);
  lpBreakdownCache =
    lpBreakdown ?? init.then(({ tokenPrices, lpPrices, lpBreakdown }) => lpBreakdown);
};

const saveToRedis = async () => {
  await setKey('TOKEN_PRICES', await tokenPricesCache);
  await setKey('LP_PRICES', await lpPricesCache);
  await setKey('LP_BREAKDOWN', await lpBreakdownCache);
  console.log('Prices saved to redis');
};
