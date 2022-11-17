const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, password, typeOfUser } = req.body;
  await User.create({ username, password, typeOfUser });

  res.status(201).json({
    status: 'success',
    message: 'User created successfully!',
  });
});
