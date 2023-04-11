const mongoose = require('mongoose');

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

module.exports = mongoose.model('Country', countrySchema);
