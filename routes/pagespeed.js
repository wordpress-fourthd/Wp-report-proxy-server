// routes/pagespeed.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const axios = require('axios');

const API_KEY = process.env.PAGESPEED_API_KEY;

router.post('/getinsights', authenticate, async (req, res) => {
  const { url, strategy } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing "url"' });

  const query = [
    `url=${encodeURIComponent(url)}`,
    `strategy=${strategy || 'mobile'}`,
    `key=${API_KEY}`,
    'category=performance',
    'category=accessibility',
    'category=best-practices',
    'category=seo'
  ].join('&');

  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${query}`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (err) {
    console.error('❌ PageSpeed error:', err.message);
    res.status(500).json({ error: 'Failed to fetch PageSpeed data' });
  }
});

module.exports = router;
