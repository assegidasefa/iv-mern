import express from "express"
import { addCustomer, deleteCustomer, getCustomers } from "../controllers/customerController.js";
const customerRouter = express.Router()



customerRouter.post("/",addCustomer)
customerRouter.get("/",getCustomers)
customerRouter.delete("/:id",deleteCustomer)





export default customerRouter;
