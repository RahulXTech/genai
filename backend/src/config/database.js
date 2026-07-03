const mongoose = require("mongoose")


async function connectDB(){
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log("Connected to dataBase")
    }catch(err){
        console.log("MongoDB connectrion message :", err)
    }
}

module.exports = connectDB;