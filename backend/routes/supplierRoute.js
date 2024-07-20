import express from "express"
const supplierRouter = express.Router()
import { createNewSupplier, getSupplier } from "../controllers/supplierController.js";


supplierRouter.post("",createNewSupplier);
supplierRouter.get("",getSupplier);




export default supplierRouter;
