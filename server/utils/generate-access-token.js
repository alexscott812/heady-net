const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      user: user,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60, // 1 minute
    }
  );
};

module.exports = generateAccessToken;
