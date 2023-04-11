const countKeys = (obj, keysToCount = []) => {
	return Object.keys(obj).reduce(
		(acc, key) => (keysToCount.includes(key) ? acc + 1 : acc),
		0
	);
};

export default countKeys;
