const express = require('express');
const router = express.Router();
const Folder = require('../models/folders');
const Item = require('../models/items');

router.get('/getallfolders', async (req, res) => {
	try {
		const data = await Folder.find();
		res.json({ data });
	} catch (err) {
		res.json({ message: 'error' });
	}
});

router.post('/createfolder', (req, res) => {
	try {
		const data = req.body.data;
		const newFolder = new Folder(data);
		newFolder.save();
		res.json({ message: 'new folder created', data: newFolder, statusCode: 200 });
	} catch (err) {
		res.json({ message: err, statusCode: 400 });
	}
});

// search by title of the folder
router.post('/getfoldersanditemsbyitstitle', async (req, res) => {
	try {
		const title = req.body.data.title;
		const folders = await Folder.find({
			title: {
				$regex: title,
				$options: 'i'
			}
		});
		const posts = await Item.find({
			title: {
				$regex: title,
				$options: 'i'
			}
		});

		res.json({ message: 'some folders', folders: folders, posts: posts, statusCode: 200 });
	} catch (err) {
		res.json({ message: err, statusCode: 400 });
	}
});

// feed get allposts and folders
router.get('/getallpostsandfolders', async (req, res) => {
	try {
		const folders = await Folder.find();
		const posts = await Item.find();
		res.json({ message: 'all folders', folders: folders, posts: posts, statusCode: 200 });
	} catch (err) {
		res.json({ message: err, statusCode: 400 });
	}
});

router.post('/subscribe', async (req, res) => {
	try {
		const folders = req.body.data.folders;
		const subscribedFolders = await Folder.find({ _id: { $in: folders } });
		res.json({ message: 'subscribed folders arrived', folders: subscribedFolders, statusCode: 200 });
	} catch (err) {
		res.json({ message: err, statusCode: 400 });
	}
});

module.exports = router;
