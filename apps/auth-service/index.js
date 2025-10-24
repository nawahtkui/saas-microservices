const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

app.post('/login', (req, res) => {
  const { username } = req.body;
  const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

app.get('/me', (req, res) => {
  try {
    const auth = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(auth, JWT_SECRET);
    res.json(user);
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(4002, () => console.log('auth-service running on port 4002'));
