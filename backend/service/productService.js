import Product from "../models/Product.js";

export const getProduct = (
    
  ) => {
    return Product.find({});
  };
  
  