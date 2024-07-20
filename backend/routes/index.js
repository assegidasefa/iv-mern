import express from 'express'
import productRouter from './productRoutes.js'
import userRouter from "./userRoutes.js"
import categoryRouter from './categoryRoutes.js'
import supplierRouter from './supplierRoute.js'
const app = express.Router()



app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/supplier', supplierRouter)



export default app