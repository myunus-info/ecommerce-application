const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

module.exports = catchAsync(async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You must log in to get access!', 401));
  }
  const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decodedToken.userId);
  if (!currentUser) {
    return next(new AppError('The token is invalid or expired!', 401));
  }

  req.user = currentUser;
  next();
});
