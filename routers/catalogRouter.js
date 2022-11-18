const express = require('express');
const catalogController = require('../controllers/catalogController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create-catalog', auth, catalogController.createCatalog);

module.exports = router;
