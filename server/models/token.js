const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	user_id: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Token', tokenSchema);
