const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const string = {
	type: 'string',
	required: true,
	lowercase: true,
	index: { unique: true }
};

const tagSchema = mongoose.Schema({
	tag: string
});

module.exports = mongoose.model('tags', tagSchema);
