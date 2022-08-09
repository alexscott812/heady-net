const pick = (obj, paths) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (paths.indexOf(key) !== -1)
      acc[key] = obj[key];
    return acc;
  }, {});
};

export default pick;
