import { app } from "./App.js";

app.listen(process.env.PORT,()=>{
    console.log(`listen port at:`,process.env.ENVIROMENT ==='dev'? process.env.DEV_ENVIROMENT_LINK+process.env.PORT:process.env.PRODUCTION_ENVIROMENT_LINK)
})