const express = require('express');
const router = express.Router();
const { getProducts, addProduct } = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');

router.route('/').get(getProducts).post(upload.single('image'), addProduct);

module.exports = router;
