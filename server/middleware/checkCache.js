const redisClient = require('../utils/redis');
const createError = require('../utils/createError');

const checkCache = async (req, res, next) => {
  // if (!redisClient || !redisClient.connected) {
  //   next();
  // }
  redisClient.get(req.originalUrl, (err, data) => {
    if (err) {
      console.log('CACHE ERROR: ', err.message);
      return next();
    }
    if (data) {
      console.log('CACHE HIT');
      return res.status(200).json(JSON.parse(data));
    } else {
      console.log('CACHE MISS');
      return next();
    }
  });


  // try {
  //   const val = await redisClient.ping();
  //   console.log(val);
  // } catch ( err ) {
  //   console.log( err );
  // }
  // next();
};

module.exports = checkCache;
