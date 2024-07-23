import express from "express"
const productRouter = express.Router()
import { getProducts, addProduct, deleteProductUsingId } from '../controllers/productController.js';
import {upload} from '../middleware/uploadMiddleware.js';


productRouter.post("/",addProduct)
productRouter.get("/",getProducts)
productRouter.delete("/:id",deleteProductUsingId)




export default productRouter;
