// routes/register.js

const express = require('express');
const router = express.Router();
const { generateTokens } = require('../utils/token');

// POST /register
router.post('/', (req, res) => {
  const { site_url } = req.body;

  if (!site_url) {
    return res.status(400).json({ error: 'Missing site_url' });
  }


  // Generate install_token + refresh_token
  const tokens = generateTokens(site_url);

  // Respond with tokens
  res.json(tokens);
});

module.exports = router;
