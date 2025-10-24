const { ethers } = require('ethers');
const abi = require('./abi.json');

function getContract(address, rpc) {
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  return new ethers.Contract(address, abi, provider);
}

module.exports = { getContract, abi };
