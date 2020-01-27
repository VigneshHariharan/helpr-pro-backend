const express = require('express');
const router = express.Router();
const Folder = require('../models/folders');
const Item = require('../models/items');

router.put('/like', async (req, res) => {
	try {
		const title = req.body.data.title;
		const url = req.body.data.url;
		const post = await Item.updateOne({ title: { $eq: title }, url: { $eq: url } }, { $inc: { likes: 1 } });
		res.json({ message: 'liked', statusCode: 200 });
	} catch (err) {
		res.json({ message: err, statusCode: 400 });
	}
});

router.put('/views', async (req, res) => {
	try {
		const title = req.body.data.title;
		const url = req.body.data.url;
		const post = await Item.updateOne({ title: { $eq: title }, url: { $eq: url } }, { $inc: { views: 1 } });
		res.json({ message: 'viewed', statusCode: 200 });
	} catch (err) {
		res.json({ message: err, statusCode: 400 });
	}
});

router.post('/findmostlikeditem', async (req, res) => {
	try {
		const tags = req.body.data.tags;
		let items = [];
		const getAllElementsInTheTags = await Item.find({ tags: { $in: tags } }).sort({ likes: 'descending' }).exec();
		console.log(getAllElementsInTheTags);
		res.json({
			message: 'most liked item in the tag',
			items: getAllElementsInTheTags,
			statusCode: 200
		});
	} catch (err) {
		res.json({ message: err, statusCode: 400 });
	}
});

module.exports = router;
