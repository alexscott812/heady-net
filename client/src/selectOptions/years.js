import createRangeArray from '../utils/create-range-array.js';

const yearOptions = createRangeArray(1965, 1995)
  .map(val => ({
    _id: val,
    name: val
  }));

export default yearOptions;
