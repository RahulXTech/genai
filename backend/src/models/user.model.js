const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        unique : [true, "User name already tacken."],
        require : true
    },

    email : {
        type : String,
        unique : [true, "EmailID already registered"],
        require : true
    },
    password : {
        type : String,
        require : true
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel;