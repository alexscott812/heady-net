const mongoose = require('mongoose');

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

module.exports = mongoose.model('Image', imageSchema);
