const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Catalog = require('../models/catalogModel');
const Order = require('../models/orderModel');

exports.createCatalog = catchAsync(async (req, res, next) => {
  if (req.user.typeOfUser !== 'seller') {
    return next(new AppError('You are not allowed to create products catalog!', 403));
  }

  const productsCatalog = await Catalog.findOne({ seller: req.user._id });
  if (productsCatalog) {
    productsCatalog.products.push(...req.body.products);
    await productsCatalog.save();
  } else {
    await Catalog.create({ ...req.body, seller: req.user._id });
  }

  res.status(201).json({
    status: 'success',
    message: 'Products catalog created successfully!',
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  if (req.user.typeOfUser !== 'seller') {
    return next(new AppError('Only sellers can see the list of orders!', 403));
  }
  const orders = await Order.find({ seller: req.user._id });
  if (!orders.length || orders.length <= 0) {
    return next(new AppError('You have no orders now!', 404));
  }

  orders.forEach(order => (order.seller = undefined));

  res.status(200).json({
    status: 'success',
    orders,
  });
});
