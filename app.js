const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv');

const folders = require('./routes/folders');
const items = require('./routes/items');
const counters = require('./routes/likesAndViews');

// app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/', items);
app.use('/', folders);
app.use('/counters', counters);

mongoose
	.connect('mongodb+srv://vignesh:Vigneshph@helpr-pro-wap8b.mongodb.net/test', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('db connected'))
	.catch((err) => console.log('error in db', err));

app.listen(3000, () => {
	console.log('server listening on 3000...');
});
