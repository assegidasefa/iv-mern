import Product from "../models/Product.js";
import { getProduct } from "../service/productService.js";

export const getProducts = async (req, res) => {
  try {
    const products = await getProduct();
    res.json({ products: products, success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addProduct = async (req, res) => {
  const { name, price, description, categoryID, image, quantity, supplierID } =
    req.body;
  // const image = req.file.path;

  try {
    const product = new Product({
      name,
      price,
      description,

      image,
      supplierID,
      categoryID,
      quantity,
    });

    const createdProduct = await product.save();
    if (createdProduct) {
      res.status(201).json({ success: true, message: "add succssfully" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// module.exports = {
//   getProducts,
//   addProduct
// };
