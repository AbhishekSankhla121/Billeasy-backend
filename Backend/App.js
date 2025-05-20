import express from 'express'
import {config} from 'dotenv'
import { ConnectToDataBase } from './config/databaseConnection.js'
import bookRouter from "./Routes/book.js"
import userRouter from './Routes/user.js'
import reviewRouter from './Routes/review.js'
import ErrorMiddleware from './middlewares/Error.js'

config({
    path:"./config/.env"
})

export const app = express()
ConnectToDataBase()

app.use(express.urlencoded())
app.use(express.json())

const prefix = "/api/v1"
app.use(`${prefix}`,userRouter)
app.use(`${prefix}`,bookRouter)
app.use(`${prefix}`,reviewRouter)


app.use(ErrorMiddleware);