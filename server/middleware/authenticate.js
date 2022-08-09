const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verifyToken');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ msg: 'Not authenticated' });
    }
    const [authType, authToken] = authHeader.split(' ');
    if (authType !== 'Bearer') {
      return res.status(401).json({ msg: 'Expected a Bearer token' });
    }
    if (!authToken) {
      return res.status(401).json({ msg: 'No token provided' });
    }
    if (!verifyToken(authToken)) {
      return res.status(401).json({ msg: 'Invalid token' })
    }
    const verified = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = verified.user;
    next();

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authenticate;
