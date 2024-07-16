import express from "express"
const productRouter = express.Router()
import { getProducts, addProduct } from '../controllers/productController.js';
import {upload} from '../middleware/uploadMiddleware.js';


productRouter.route('/').get(getProducts).post(upload.single('image'), addProduct);

export default productRouter;
