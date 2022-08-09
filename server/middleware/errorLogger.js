const errorLogger = (err, req, res, next) => {
  console.log(`${'\x1b[31m'}${err.stack}${'\x1b[0m'}`);
  //console.error(err);
  next(err);
};

module.exports = errorLogger;
