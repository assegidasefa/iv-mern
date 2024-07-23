import Product from "../models/Product.js";

export const getProduct = () => {
  return Product.find({}).lean();
};

export const deleteProductById = (_id) => {
  return Product.findByIdAndDelete(_id);
};
