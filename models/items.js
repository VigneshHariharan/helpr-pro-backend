const mongoose = require('mongoose');

const string = {
	type: 'string',
	required: true
};

const date = {
	type: Date,
	defaultValue: Date.now()
};

const counters = {
	type: Number,
	defaultValue: 0
};

const itemSchema = mongoose.Schema({
	title: string,
	url: string,
	date: date,
	views: counters,
	likes: counters,
	tags: [ String ],
	linkedBy: { string, defaultValue: '' },
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		defaultValue: 0
	}
});

module.exports = mongoose.model('item', itemSchema);
