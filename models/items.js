const mongoose = require('mongoose');

const string = {
	type: 'string',
	required: true
};

const date = {
	type: Date,
	default: Date.now()
};

const counters = {
	type: Number,
	default: 0
};

const itemSchema = mongoose.Schema({
	title: string,
	url: string,
	date: date,
	views: counters,
	likes: counters,
	tags: [ Object ],
	linkedBy: { string, default: '' },
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		defaultValue: 0
	}
});

module.exports = mongoose.model('item', itemSchema);
