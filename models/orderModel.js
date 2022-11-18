const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      name: {
        type: String,
        required: [true, 'Please enter product name!'],
      },
      price: {
        type: Number,
        required: [true, 'Please enter product price!'],
      },
    },
  ],
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Buyer Id is a required field!'],
  },
});

module.exports = mongoose.model('Order', orderSchema);
