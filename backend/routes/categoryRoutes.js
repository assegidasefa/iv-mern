import express from "express"
const categoryRouter = express.Router()
import { createNewCategory, getCategory } from "../controllers/categoryController.js";


categoryRouter.post("",createNewCategory);
categoryRouter.get("",getCategory);



export default categoryRouter;
