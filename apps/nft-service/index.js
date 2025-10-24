const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());

app.post('/mint', (req, res) => {
  const { name, creator } = req.body;
  // هنا سيتم لاحقًا إضافة تكامل IPFS والعقد الذكي
  res.json({ status: 'queued', name, creator });
});

app.listen(4003, () => console.log('nft-service running on port 4003'));
