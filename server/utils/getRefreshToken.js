const crypto = require('crypto');

const getRefreshToken = () => {
  return crypto.randomBytes(64).toString('hex');
};

module.exports = getRefreshToken;
