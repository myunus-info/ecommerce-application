const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const Catalog = require('../models/catalogModel');
const Order = require('../models/orderModel');

exports.getSellers = catchAsync(async (req, res, next) => {
  if (req.user.typeOfUser !== 'buyer') {
    return next(new AppError('Only buyers can see the list of sellers!', 403));
  }
  const sellers = (await User.find()).filter(user => user.typeOfUser === 'seller');

  if (!sellers.length || sellers.length <= 0) {
    return next(new AppError('No sellers exist right now!', 404));
  }

  res.status(200).json({
    status: 'success',
    sellers,
  });
});

exports.getCatalogBySellerId = catchAsync(async (req, res, next) => {
  if (req.user.typeOfUser !== 'buyer') {
    return next(new AppError('Only buyers can see the list of sellers!', 403));
  }
  const catalog = await Catalog.findOne({ seller: req.params.seller_id });
  if (!catalog?.products.length || catalog?.products.length <= 0) {
    return next(new AppError('This catalog contains no products now!', 404));
  }
  res.status(200).json({
    status: 'success',
    catalog: catalog.products,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  if (req.user.typeOfUser !== 'buyer') {
    return next(new AppError('Only buyers can see the list of sellers!', 403));
  }
  const catalog = await Catalog.findOne({ seller: req.params.seller_id });
  if (!catalog?.products.length || catalog?.products.length <= 0) {
    return next(new AppError('This catalog contains no products now!', 404));
  }

  await Order.create({ products: catalog.products, buyer: req.user._id });

  res.status(201).json({
    status: 'success',
    message: 'Order created successfully!',
  });
});
