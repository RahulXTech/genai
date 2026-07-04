const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token : {
        type: String,
        require : [true, "Toke is require to be added in blacklist"],
    }
},{
    timestamps : true
})

const blacklistTokeModel = mongoose.model("blackelistTokes", blacklistTokenSchema);

module.exports = blacklistTokeModel;