const { chainRandomClients, _web3Factory, _multicallAddress } = require('./web3Helpers');

// keep backwards compat for commonJs export system, but still get types in code by importing from web3Helpers.js

module.exports = {
  get polygonWeb3() {
    return chainRandomClients.polygonRandomClient();
  },

  web3Factory: _web3Factory,

  multicallAddress: _multicallAddress,
};
