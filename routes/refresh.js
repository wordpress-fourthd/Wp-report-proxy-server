// routes/refresh.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { generateTokens } = require('../utils/token');

const SECRET_KEY = process.env.SECRET_KEY;

router.post('/', (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: 'Missing refresh_token' });
  }

  try {
    const payload = jwt.verify(refresh_token, SECRET_KEY);

    // Optional: check if token is revoked or blacklisted

    // Generate a new install_token (but keep same refresh_token)
    const install_token = jwt.sign({ site_url: payload.site_url }, SECRET_KEY, {
      expiresIn: '15m'
    });

    res.json({ install_token });

  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired refresh_token' });
  }
});

module.exports = router;
