const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const axios = require('axios');

const API_KEY = process.env.PAGESPEED_API_KEY;

// POST /proxy/pagespeed
router.post('/pagespeed', authenticate, async (req, res) => {
  const { url, strategy } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing "url" in request body' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', {
     params: {
  url,
  strategy: strategy || 'mobile',
  key: API_KEY,
  category: ['performance', 'accessibility', 'best-practices', 'seo']
}
    });

    res.json(response.data);
  } catch (err) {
    console.error('❌ PageSpeed error:', err.message);
    res.status(500).json({ error: 'Failed to fetch PageSpeed data' });
  }
});

module.exports = router;
