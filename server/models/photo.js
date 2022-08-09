const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  // show_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // },
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
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Photo', photoSchema);
