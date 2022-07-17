const { getMaticApys } = require('./matic');
const { getKey, setKey } = require('../../utils/redisHelper');

const INIT_DELAY = process.env.INIT_DELAY || 60 * 1000;
var REFRESH_INTERVAL = 15 * 60 * 1000;

let apys = {};
let apyBreakdowns = {};

const getApys = () => {
  return {
    apys,
    apyBreakdowns,
  };
};

const updateApys = async () => {
  console.log('> updating apys');

  try {
    const results = await Promise.allSettled([getMaticApys()]);

    for (const result of results) {
      if (result.status !== 'fulfilled') {
        console.warn('getApys error', result.reason);
        continue;
      }

      // Set default APY values
      let mappedApyValues = result.value;
      let mappedApyBreakdownValues = {};

      // Loop through key values and move default breakdown format
      // To require totalApy key
      for (const [key, value] of Object.entries(result.value)) {
        mappedApyBreakdownValues[key] = {
          totalApy: value,
        };
      }

      // Break out to apy and breakdowns if possible
      let hasApyBreakdowns = 'apyBreakdowns' in result.value;
      if (hasApyBreakdowns) {
        mappedApyValues = result.value.apys;
        mappedApyBreakdownValues = result.value.apyBreakdowns;
      }

      apys = { ...apys, ...mappedApyValues };

      apyBreakdowns = { ...apyBreakdowns, ...mappedApyBreakdownValues };
    }

    console.log('> updated apys');
    await saveToRedis();
  } catch (err) {
    console.error('> apy initialization failed', err);
  }

  setTimeout(updateApys, REFRESH_INTERVAL);
};

const initApyService = async () => {
  let cachedApy = await getKey('APY');
  let cachedApyBreakdown = await getKey('APY_BREAKDOWN');
  apys = cachedApy ?? {};
  apyBreakdowns = cachedApyBreakdown ?? {};

  setTimeout(updateApys, INIT_DELAY);
};

const saveToRedis = async () => {
  await setKey('APY', apys);
  await setKey('APY_BREAKDOWN', apyBreakdowns);
  console.log('APYs saved to redis');
};

module.exports = { getApys, initApyService };
