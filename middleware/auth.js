const { verifyToken } = require('../utils/token');

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // "Bearer token123"

  if (!token) {
    return res.status(401).json({ error: 'Missing Authorization token' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }

  // Attach site info to request
  req.site_url = payload.site_url;
  next();
}

module.exports = authenticate;
