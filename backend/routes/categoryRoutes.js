import express from "express"
const categoryRouter = express.Router()
import { createNewCategory, deleteCategoryUsingId, getCategory } from "../controllers/categoryController.js";


categoryRouter.post("",createNewCategory);
categoryRouter.get("",getCategory);
categoryRouter.delete("/:id",deleteCategoryUsingId);




export default categoryRouter;
