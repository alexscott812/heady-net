import createRangeArray from '../utils/create-range-array.js';

const dayOptions = createRangeArray(1, 31)
  .map(val => ({
    _id: val,
    name: val
  }));

export default dayOptions;
