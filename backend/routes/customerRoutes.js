import express from "express"
import { addCustomer, getCustomers } from "../controllers/customerController.js";
const customerRouter = express.Router()



customerRouter.post("/",addCustomer)
customerRouter.get("/",getCustomers)




export default customerRouter;
