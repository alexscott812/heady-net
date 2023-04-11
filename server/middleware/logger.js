const logger = (req, res, next) => {
	// const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
	const url = `${req.originalUrl}`;
	console.log(`${'\x1b[36m'}${req.method} ${url}${'\x1b[0m'}`);
	//console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
	next();
};

module.exports = logger;
