import express from "express"
const userRouter = express.Router()
import { createNewUser, login } from "../controllers/userController.js";


userRouter.post("",createNewUser);
userRouter.post("/login",login)


export default userRouter;
