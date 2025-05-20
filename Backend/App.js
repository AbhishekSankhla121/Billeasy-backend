import express from 'express'
import {config} from 'dotenv'
import { ConnectToDataBase } from './config/databaseConnection.js'

config({
    path:"./config/.env"
})

export const app = express()
ConnectToDataBase()

app.use(express.urlencoded())
app.use(express.json())


app.get("/",(req,res,next)=>{
    res.send(`service up`)
})


