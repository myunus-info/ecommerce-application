const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide your email address!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address!'],
  },
  password: {
    type: String,
    required: [true, 'Please provide your password!'],
    minlength: [6, 'Password must be at least 6 characters long!'],
    select: false,
  },
  typeOfUser: {
    type: String,
    enum: ['buyer', 'seller'],
    required: [true, 'Please provide your password!'],
  },
});

// userSchema.virtual('catalogs', {
//   ref: 'Catalog',
//   localField: '_id',
//   foreignField: 'seller',
// });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (userPassword, hashedPassword) {
  return await bcrypt.compare(userPassword, hashedPassword);
};

module.exports = mongoose.model('User', userSchema);
