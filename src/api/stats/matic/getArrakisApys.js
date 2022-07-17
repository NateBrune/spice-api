const { createClient } = require('graphqurl');
const pools = require('../../../data/matic/arrakisPools.json');
const performanceFee = 0.0;

const getArrakisApys = async () => {
  //const apr = yearlyRewardsInUsd.dividedBy(totalStakedInUsd);
  //const apy = compound(apr, BASE_HPY, 1, 0.955);

  const client = createClient({
    endpoint: 'https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-polygon',
    headers: {
      Authorization: 'Bearer <token>',
    },
  });

  const queryVaults = `{
      vaults {
        id
        blockCreated
        timestampCreated
        manager
        address
        uniswapPool
        token0 {
          name
          address
          symbol
          decimals
          __typename
        }
        token1 {
          name
          address
          symbol
          decimals
          __typename
        }
        feeTier
        liquidity
        positionId
        lowerTick
        upperTick
        managerFee
        totalSupply
        name
        feeInfo {
          burn0
          burn1
          collect0
          collect1
          feeCheckpoint0
          feeCheckpoint1
          checkpointTimestamp
          __typename
        }
        apr {
          averageApr
          timestamp
          __typename
        }
        __typename
      }
    }`;

  const data = await client.query({
    query: queryVaults,
    variables: {},
  });

  var basicApys = {};
  var breakdownApys = {};
  pools.forEach(pool => {
    data['data']['vaults'].forEach(vault => {
      console.log(vault);
      if (vault['id'] == pool['address'].toLowerCase()) {
        apr = vault['apr']['averageApr'] / 100;
        basicApys[pool['name']] = apr;
        breakdownApys[pool['name']] = {
          vaultApr: apr,
          compoundingsPerYear: 0,
          beefyPerformanceFee: performanceFee,
          vaultApy: apr,
          totalApy: apr,
        };
      }
    });
  });
  return {
    apys: basicApys,
    apyBreakdowns: breakdownApys,
  };
};

module.exports = getArrakisApys;
