const mongoose = require('mongoose');

const string = {
	type: 'string',
	required: true
};

const folderSchema = mongoose.Schema({
	title: string,
	items: [ Object ]
});

module.exports = mongoose.model('folder', folderSchema);
