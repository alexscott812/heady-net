const mongoose = require("mongoose");
const songSchema = require("./song").schema;
const venueSchema = require("./venue").schema;
const setSchema = require("./set").schema;
const imageSchema = require("./image").schema;
const citySchema = require("./city").schema;
const stateSchema = require("./state").schema;
const countrySchema = require("./country").schema;

const showSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  city: {
    type: citySchema,
    required: true,
  },
  state: {
    type: stateSchema,
    required: false,
  },
  country: {
    type: countrySchema,
    required: true,
  },
  venue: {
    type: venueSchema,
    required: true,
  },
  sets: [
    {
      type: setSchema,
      required: true,
    },
  ],
  images: [
    {
      type: imageSchema,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Show", showSchema);
