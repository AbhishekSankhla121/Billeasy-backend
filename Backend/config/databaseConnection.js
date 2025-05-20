import mongoose from "mongoose" 

async function ConnectToDataBase (){
    try {
        const ConnectionStringURL = process.env.ENVIROMENT ==='dev'? process.env.DEV_ENVIROMENT_DATABASE_CONNECTION_STRING: process.env.PRODUCTION_ENVIROMENT_DATABASE_CONNECTION_STRING
        await mongoose.connect(ConnectionStringURL);
        console.log("Connected to MongoDB successfully:", ConnectionStringURL);
    } catch (error) {
        console.error("Error: Connection to MongoDB failed\n", error);
    }
}

export {ConnectToDataBase}