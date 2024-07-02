const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addProduct = async (req, res) => {
    const { name, price, description, countInStock } = req.body;
    const image = req.file.path;
  
    try {
      const product = new Product({
        name,
        price,
        description,
        countInStock,
        image,
      });
  
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = {
  getProducts,
  addProduct
};
