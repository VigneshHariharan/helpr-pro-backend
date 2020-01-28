const express = require('express');
const router = express.Router();
const Folder = require('../models/folders');
const Item = require('../models/items');
const Tag = require('../models/tags');

router.get('/getallposts', async (req, res) => {
	try {
		const data = await Item.find();
		res.json({ data });
	} catch (err) {
		res.json({ message: 'error' });
	}
});

router.post('/insertpost/', async (req, res) => {
	try {
		const data = req.body.data;
		// const parentFolderName = data.folderName;
		const parentId = data.parentId;
		// or parentId
		const url = req.body.data.url;
		const post = await Item.findOne({ url: { $eq: url } });
		if (post) {
			res.json({ message: 'this post already exists' });
			return;
		}
		const item = new Item(req.body.data);
		item.save();
		const folder = await Folder.findByIdAndUpdate(parentId, { $push: { items: item._id } });
		folder.save();
		const responseData = await Folder.findById(parentId);
		res.json({ data: responseData });
	} catch (err) {
		res.json({ message: 'error', error: err });
	}
});

router.post('/createPosts', (req, res) => {
	try {
		const data = req.body.data;
		const newPost = new Item(data);
		newPost.save();
		res.json({ message: 'new post created', data: newPost });
	} catch (err) {
		res.json({ message: err, statusCode: 400 });
	}
});

router.post('/moveposts', async (req, res) => {
	try {
		const data = req.body.data;
		const sourceFolderId = data.parentId;
		const targetFolderId = data.targetId;
		const url = req.body.data.url;
		const post = await Item.findOne({ url: { $eq: url } });

		res.json({ message: 'new post created', data: newPost });
	} catch (err) {
		res.json({ message: err, statusCode: 400 });
	}
});

router.post('/addtags', async (req, res) => {
	try {
		const tags = req.body.data.tags;
		for (tag of tags) {
			const tagModal = new Tag({ tag: tag });
			tagModal.save();
		}
		const updatedTags = await Tag.find();
		res.json({ message: 'new tags created', data: updatedTags, statusCode: 200 });
	} catch (err) {
		res.json({ message: err, statusCode: 400 });
	}
});

router.get('/getalltags', async (req, res) => {
	try {
		const tags = await Tag.find();
		res.json({ message: 'all the existing tags', data: tags, statusCode: 200 });
	} catch (err) {
		res.json({ message: err, statusCode: 400 });
	}
});

router.post('/filterbytags', async (req, res) => {
	try {
		const tagsNeeded = req.body.data.tags;
		const tags = await Tag.find({ tags: { $in: tagsNeeded } });
		res.json({ message: 'filtered tags', data: tags, statusCode: 200 });
	} catch (err) {
		res.json({ message: err, statusCode: 400 });
	}
});

module.exports = router;
