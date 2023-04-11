import createRangeArray from "./utils/create-range-array.js";

const DAY_OPTIONS = createRangeArray(1, 31).map((val) => ({
  _id: val,
  name: val,
}));

const MONTH_OPTIONS = createRangeArray(1, 12).map((val) => ({
  _id: val,
  name: val,
}));

const YEAR_OPTIONS = createRangeArray(1965, 1995).map((val) => ({
  _id: val,
  name: val,
}));

const SHOW_SORT_OPTIONS = [
  {
    name: "Oldest",
    value: "date",
  },
  {
    name: "Newest",
    value: "-date",
  },
];

const SONG_SORT_OPTIONS = [
  {
    name: "Name (A-Z)",
    value: "name",
  },
  {
    name: "Name (Z-A)",
    value: "-name",
  },
];

const VENUE_SORT_OPTIONS = [
  {
    name: "Name (A-Z)",
    value: "name",
  },
  {
    name: "Name (Z-A)",
    value: "-name",
  },
];

const DEFAULT_THUMBNAIL_MD =
  "https://res.cloudinary.com/dxiw0w4ar/image/upload/v1609696521/images/default_thumbnail_md_mdjqh6.jpg";

export {
  DAY_OPTIONS,
  MONTH_OPTIONS,
  YEAR_OPTIONS,
  SHOW_SORT_OPTIONS,
  SONG_SORT_OPTIONS,
  VENUE_SORT_OPTIONS,
  DEFAULT_THUMBNAIL_MD,
};
