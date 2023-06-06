const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  //phone: { type: String, required: true },
});

userSchema.virtual('ads', {
  ref: 'Ad',
  localField: '_id',
  foreignField: 'userId',
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
