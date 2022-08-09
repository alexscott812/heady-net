import createRangeArray from '../utils/create-range-array.js';

const monthOptions = createRangeArray(1, 12)
  .map(val => ({
    _id: val,
    name: val
  }));

export default monthOptions;
