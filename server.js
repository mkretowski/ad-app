const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./db');
const mongoose = require('mongoose');
//start express server
const app = express();
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

//connectToDB();

//add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// add routes
//app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));
//app.use('/api', require('./routes/users.routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV);
let dbUri = '';

if (NODE_ENV === 'production') {
  dbUri = '';
} else if (NODE_ENV === 'test') {
  dbUri = 'mongodb://localhost:27017/adsDBtest';
} else {
  dbUri = 'mongodb://localhost:27017/adsDB';
}

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

//module.exports = server;
