const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.get('/list-of-sellers', auth, orderController.getSellers);
router.get('/seller-catalog/:seller_id', auth, orderController.getCatalogBySellerId);
router.post('/create-order/:seller_id', auth, orderController.createOrder);

module.exports = router;
