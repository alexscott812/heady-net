const crypto = require('crypto');

const getPasswordResetToken = () => {
  return crypto.randomBytes(64).toString('hex');
};

module.exports = getPasswordResetToken;
