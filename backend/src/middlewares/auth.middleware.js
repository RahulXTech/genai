const jwt = require("jsonwebtoken");
const blacklistTokeModel = require("../models/blacklist.model");


async function authUser(req, res, next){
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message : "Token is not provided."
        })
    }
    const isTokenBlackListed = await blacklistTokeModel.findOne({token});
    if(isTokenBlackListed){
        return res.status(401).json({
            message : "Token is invalid. "
        })
    } 

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
    }catch(err){
        return res.status(401).json({
            message : "Invalid token."  
        })
    }
    next()
}

module.exports = {authUser}