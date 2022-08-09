const createRangeArray = (start, end) => {
  return [...Array(end - start + 1).keys()]
    .map(val => start + val);
};

export default createRangeArray;
