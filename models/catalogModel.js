const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  products: [
    {
      name: {
        type: String,
        required: [true, 'Product name is required!'],
      },
      price: {
        type: Number,
        required: [true, 'Product name is required!'],
      },
    },
  ],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller Id is a required field!'],
  },
});

module.exports = mongoose.model('Catalog', catalogSchema);
