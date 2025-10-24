const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider(process.env.BSC_RPC);
const NWTK_ADDRESS = process.env.NWTK_ADDRESS;
const NWTK_ABI = require('../../packages/web3-utils/abi.json');
const contract = new ethers.Contract(NWTK_ADDRESS, NWTK_ABI, provider);

app.get('/balance/:address', async (req, res) => {
  try {
    const bal = await contract.balanceOf(req.params.address);
    res.json({ balance: bal.toString() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`token-service running on port ${PORT}`));
