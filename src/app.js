import express, { json, urlencoded } from 'express'
import { config } from 'dotenv'
import { set, connect } from 'mongoose'
import cors from 'cors'
import ProductRouter from './products/productRouter.js'
import BillRouter from './bill-generation/billRouter.js'

const app = express()
config()
app.use(json())
app.use(urlencoded({extended: true}))
app.use(cors())
set('strictQuery', false)

const PORT = process.env.PORT
const MONGODB = process.env.MONGO_DB

app.use('/product/', ProductRouter)
app.use('/bill/', BillRouter)

const start = async() => {

    await connect(`${MONGODB}`)
    app.listen(PORT, () => console.log(`Billing System Serving on the Port ${PORT}`))
}

start()