import express from "express"
const productRouter = express.Router()
import { getProducts, addProduct } from '../controllers/productController.js';
import {upload} from '../middleware/uploadMiddleware.js';


productRouter.post("/",addProduct)
productRouter.get("/",getProducts)



export default productRouter;
