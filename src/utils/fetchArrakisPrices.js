//const { request } = require('graphql-request')
const { createClient } = require('graphqurl');
const { ethers } = require('ethers');
const { FormatTypes, Interface } = require('@ethersproject/abi');

const fetchArrakisPrices = async (pools, knownPrices) => {
  newPoolPrices = {};
  prices = knownPrices;
  //```
  //WEB3 ENGINE
  //```
  const provider = new ethers.providers.JsonRpcProvider(
    'https://polygon-mainnet.infura.io/v3/036aa7fcb3f245ebacb5e9e7ab0c00b5'
  );

  const jsonAbiVault = `[{"inputs":[{"internalType":"address payable","name":"_gelato","type":"address"},{"internalType":"address","name":"_arrakisTreasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"burnAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidityBurned","type":"uint128"}],"name":"Burned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"feesEarned0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"feesEarned1","type":"uint256"}],"name":"FeesEarned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"mintAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidityMinted","type":"uint128"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousManager","type":"address"},{"indexed":true,"internalType":"address","name":"newManager","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"int24","name":"lowerTick_","type":"int24"},{"indexed":false,"internalType":"int24","name":"upperTick_","type":"int24"},{"indexed":false,"internalType":"uint128","name":"liquidityBefore","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"liquidityAfter","type":"uint128"}],"name":"Rebalance","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"managerFeeBPS","type":"uint16"},{"indexed":false,"internalType":"address","name":"managerTreasury","type":"address"},{"indexed":false,"internalType":"uint16","name":"gelatoRebalanceBPS","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"gelatoSlippageBPS","type":"uint16"},{"indexed":false,"internalType":"uint32","name":"gelatoSlippageInterval","type":"uint32"}],"name":"UpdateManagerParams","type":"event"},{"inputs":[],"name":"GELATO","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RESTRICTED_MINT_ENABLED","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"arrakisBalance0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"arrakisBalance1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"arrakisFeeBPS","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"arrakisTreasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"burnAmount","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"},{"internalType":"uint128","name":"liquidityBurned","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int24","name":"newLowerTick","type":"int24"},{"internalType":"int24","name":"newUpperTick","type":"int24"},{"internalType":"uint160","name":"swapThresholdPrice","type":"uint160"},{"internalType":"uint256","name":"swapAmountBPS","type":"uint256"},{"internalType":"bool","name":"zeroForOne","type":"bool"}],"name":"executiveRebalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gelatoRebalanceBPS","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gelatoSlippageBPS","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gelatoSlippageInterval","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Max","type":"uint256"},{"internalType":"uint256","name":"amount1Max","type":"uint256"}],"name":"getMintAmounts","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"},{"internalType":"uint256","name":"mintAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPositionID","outputs":[{"internalType":"bytes32","name":"positionID","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnderlyingBalances","outputs":[{"internalType":"uint256","name":"amount0Current","type":"uint256"},{"internalType":"uint256","name":"amount1Current","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint160","name":"sqrtRatioX96","type":"uint160"}],"name":"getUnderlyingBalancesAtPrice","outputs":[{"internalType":"uint256","name":"amount0Current","type":"uint256"},{"internalType":"uint256","name":"amount1Current","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address","name":"_pool","type":"address"},{"internalType":"uint16","name":"_managerFeeBPS","type":"uint16"},{"internalType":"int24","name":"_lowerTick","type":"int24"},{"internalType":"int24","name":"_upperTick","type":"int24"},{"internalType":"address","name":"_manager_","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lowerTick","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"managerBalance0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"managerBalance1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"managerFeeBPS","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"managerTreasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"mintAmount","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"},{"internalType":"uint128","name":"liquidityMinted","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool","outputs":[{"internalType":"contract IUniswapV3Pool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint160","name":"swapThresholdPrice","type":"uint160"},{"internalType":"uint256","name":"swapAmountBPS","type":"uint256"},{"internalType":"bool","name":"zeroForOne","type":"bool"},{"internalType":"uint256","name":"feeAmount","type":"uint256"},{"internalType":"address","name":"paymentToken","type":"address"}],"name":"rebalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"restrictedMintToggle","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"toggleRestrictMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Owed","type":"uint256"},{"internalType":"uint256","name":"amount1Owed","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"uniswapV3MintCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"amount0Delta","type":"int256"},{"internalType":"int256","name":"amount1Delta","type":"int256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"uniswapV3SwapCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int16","name":"newManagerFeeBPS","type":"int16"},{"internalType":"address","name":"newManagerTreasury","type":"address"},{"internalType":"int16","name":"newRebalanceBPS","type":"int16"},{"internalType":"int16","name":"newSlippageBPS","type":"int16"},{"internalType":"int32","name":"newSlippageInterval","type":"int32"}],"name":"updateManagerParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upperTick","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawArrakisBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawManagerBalance","outputs":[],"stateMutability":"nonpayable","type":"function"}]`;
  const iface = new Interface(jsonAbiVault);
  const abi = iface.format(FormatTypes.full);

  const client = createClient({
    endpoint: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon',
    headers: {
      Authorization: 'Bearer <token>',
    },
  });

  const queryToken = `query Token($address: String) {
      token(id: $address) {
        symbol
        name
        derivedETH
        volumeUSD
        volume
        txCount
        totalValueLocked
        feesUSD
        totalValueLockedUSD
        __typename
      }
    }`;
  const queryPrices = `query Prices($block24: Int!, $block48: Int!, $blockWeek: Int!) {
      current: bundles(first: 1, subgraphError: allow) {
        ethPriceUSD
        __typename
      }
      oneDay: bundles(first: 1, block: {number: $block24}, subgraphError: allow) {
        ethPriceUSD
        __typename
      }
      twoDay: bundles(first: 1, block: {number: $block48}, subgraphError: allow) {
        ethPriceUSD
        __typename
      }
      oneWeek: bundles(first: 1, block: {number: $blockWeek}, subgraphError: allow) {
        ethPriceUSD
        __typename
      }
    }`;

  const currentBlock = await provider.getBlockNumber();
  const variablesPrices = {
    block24: currentBlock - 43200,
    block48: currentBlock - 43200 * 2,
    blockWeek: currentBlock - 43200 * 7,
  };
  const dataPrices = await client.query({
    query: queryPrices,
    variables: variablesPrices,
  });

  retVal = { tokenPrices: prices };
  for (pool of pools) {
    const token0Address = pool['lp0']['address'].toLowerCase();
    const token1Address = pool['lp1']['address'].toLowerCase();

    const variablesToken0 = { address: token0Address };
    const variablesToken1 = { address: token1Address };

    const dataToken0 = await client.query({
      query: queryToken,
      variables: variablesToken0,
    });
    const dataToken1 = await client.query({
      query: queryToken,
      variables: variablesToken1,
    });

    const ethusd = dataPrices['data']['current'][0]['ethPriceUSD'];
    prices['ETH'] = ethusd;

    const vault = {
      address: pool['address'],
      abi: abi,
    };
    const vaultContract = new ethers.Contract(vault.address, vault.abi, provider);
    const balance = await vaultContract.getUnderlyingBalances();
    const totalSupply = await vaultContract.totalSupply();
    const totalSupplyEth = ethers.utils.formatEther(totalSupply);
    const token0Eth = dataToken0['data']['token']['derivedETH'];
    const token1Eth = dataToken1['data']['token']['derivedETH'];
    const balance0 = balance[0] / pool['lp0']['decimals'];
    const balance1 = balance[1] / pool['lp1']['decimals'];
    const totalToken0inETH = token0Eth * balance0;
    const totalToken1inETH = token1Eth * balance1;
    const totalinETH = totalToken0inETH + totalToken1inETH;
    const totalinUSD = totalinETH * ethusd;
    const lpusd = totalinUSD / totalSupplyEth;
    let name = pool['name'];

    newPoolPrices[name] = lpusd;

    lpsBreakdown = {};
    lpsBreakdown[name] = {
      price: lpusd,
      tokens: [pool['lp0']['address'], pool['lp1']['address']],
      balances: [balance[0], balance[1]],
      totalSupply: totalSupplyEth,
    };

    retVal = {
      ...retVal,
      poolPrices: newPoolPrices,
      lpsBreakdown: lpsBreakdown,
    };
  }

  return retVal;
};

module.exports = { fetchArrakisPrices };
