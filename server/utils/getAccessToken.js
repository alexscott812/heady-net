const jwt = require('jsonwebtoken');

const getAccessToken = (user) => {
  return jwt.sign({
      user: user
    }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: 60 // 1 minute
    }
  );
};

module.exports = getAccessToken;
