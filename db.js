const mongoose = require('mongoose');

const connectToDB = () => {
  const NODE_ENV = process.env.NODE_ENV;
  let dbUri = '';

  if (NODE_ENV === 'production') {
    dbUri = `mongodb+srv://john-doe:${process.env.DB_PASS}@cluster0.ksgkrwz.mongodb.net/AdsDB?retryWrites=true&w=majority`;
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
