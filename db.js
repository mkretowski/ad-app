const mongoose = require('mongoose');

const connectToDB = () => {
  const NODE_ENV = process.env.NODE_ENV;
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
};

module.exports = connectToDB;
