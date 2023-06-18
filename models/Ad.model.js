const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 10, maxlength: 50 },
  content: { type: String, required: true, minlength: 20, maxlength: 1000 },
  price: { type: Number, required: true },
  publicationDate: { type: String, required: true },
  localisation: { type: String, required: true, minlength: 2, maxlength: 25 },
  userId: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Ad', adSchema);
