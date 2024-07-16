import express from 'express'
import productRouter from './productRoutes.js'
import userRouter from "./userRoutes.js"
const app = express.Router()



app.use('/products', productRouter)
app.use('/users', userRouter)


export default app