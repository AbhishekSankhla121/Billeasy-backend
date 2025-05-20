import express from 'express'
import {config} from 'dotenv'
export const app = express()

app.use(express.urlencoded())
app.use(express.json())

app.get("/",(req,res,next)=>{
    res.send(`service up`)
})

config({
    path:"./config/.env"
})
