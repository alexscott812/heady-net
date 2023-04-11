const mongoose = require("mongoose");
const songSchema = require("./song").schema;

const songInstanceSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  song: {
    type: songSchema,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  segued: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("SongInstance", songInstanceSchema);
