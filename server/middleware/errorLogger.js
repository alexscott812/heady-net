const errorLogger = (err, req, res, next) => {
  console.log(`${'\x1b[31m'}${err.message}${'\x1b[0m'}`);
  next(err);
};

module.exports = errorLogger;