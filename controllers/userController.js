const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

exports.register = catchAsync(async (req, res, next) => {
  const { username, password, typeOfUser } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return next(new AppError('The user already exists!', 401));
  }
  await User.create({ username, password, typeOfUser });

  res.status(201).json({
    status: 'success',
    message: 'User created successfully!',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError('Please provide username and password', 400));
  }
  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    return next(new AppError('Invalid username or password!', 401));
  }
  const passwordIsValid = await user.correctPassword(password, user.password);
  if (!passwordIsValid) {
    return next(new AppError('Invalid username or password', 401));
  }
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;
  res.status(200).json({
    status: 'success',
    user,
    accessToken,
  });
});
