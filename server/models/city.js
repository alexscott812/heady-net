const mongoose = require('mongoose');

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

module.exports = mongoose.model('City', citySchema);
