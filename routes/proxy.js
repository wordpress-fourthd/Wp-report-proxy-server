const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const axios = require('axios');

const API_KEY = process.env.THIRD_PARTY_API_KEY;

// POST /proxy
router.post('/', authenticate, async (req, res) => {
  try {
    // Example: forward to a third-party API using secure API_KEY
    const { endpoint, params } = req.body;

    const response = await axios.get(endpoint, {
      params,
      headers: {
        'X-API-Key': API_KEY
      }
    });

    return res.json(response.data);
  } catch (err) {
    console.error('❌ Proxy error:', err.message);
    return res.status(500).json({ error: 'Proxy request failed' });
  }
});

module.exports = router;
