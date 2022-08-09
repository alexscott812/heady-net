const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const songInstanceSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  song: {
    type: songSchema,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  segued: {
    type: Boolean,
    required: true
  }
});

const setSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  song_instances: [{
    type: songInstanceSchema,
    required: true
  }]
});

const imageSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnail_sm_url: {
    type: String,
    required: true
  },
  thumbnail_md_url: {
    type: String,
    required: true
  }
});

const citySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const stateSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const countrySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const venueSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const showSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  title : {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  city: {
    type: citySchema,
    required: true
  },
  state: {
    type: stateSchema,
    required: false
  },
  country: {
    type: countrySchema,
    required: true
  },
  venue: {
    type: venueSchema,
    required: true
  },
  sets: [{
    type: setSchema,
    required: true
  }],
  images: [{
    type: imageSchema,
    required: true
  }]
});

module.exports = mongoose.model('Show', showSchema);
