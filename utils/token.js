// utils/token.js

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

function generateTokens(site_url) {
  const install_token = jwt.sign(
    { site_url },
    SECRET_KEY,
    { expiresIn: '15m' } 
  );

  const refresh_token = jwt.sign(
    { site_url },
    SECRET_KEY,
    { expiresIn: '1d' } 
  );

  return { install_token, refresh_token };
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null; // Invalid or expired
  }
}

module.exports = {
  generateTokens,
  verifyToken
};
