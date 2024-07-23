import Product from "../models/Product.js";
import { deleteProductById, getProduct } from "../service/productService.js";

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

export const deleteProductUsingId = (req, res) => {
  const id = req.params.id
  deleteProductByIdHandler(id).then((resp) => {
      res.status(200).send(resp)
  }).catch((err) => {
      console.log(err)
      res.status(200).send({ success: false, error: "Something went worng" })
  })
}


const deleteProductByIdHandler = async (id) => {
  await deleteProductById(id)
  return { success: true, message: "Delete Successfully!!!" }
}

// module.exports = {
//   getProducts,
//   addProduct
// };
