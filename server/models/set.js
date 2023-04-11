const mongoose = require("mongoose");
const songInstanceSchema = require("./songInstance").schema;

const setSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  song_instances: [
    {
      type: songInstanceSchema,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Set", setSchema);
