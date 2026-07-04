const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")
/**
 * @name registerUserController
 * @descriptoin Register a new user, expects username, email and password in the requist 
 * @access Public
 */

async function registerUserController(req, res) {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message : "Please provide username, email and password"
        })
    } 
    const isUserAlreadExists = await userModel.findOne({
        $or: [{username},{email}]
    })

    if(isUserAlreadExists){
        return res.status(409).json({
            message: "User is already registred."
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password : hashPassword
    })

    const token = jwt.sign(
        {id : user._id, username : user.username},
        process.env.JWT_SECRET,
        {expiresIn : "1d"}

    )
    res.cookie("token", token)

    res.status(201).json({
        message : "User registered successfully",
        user: {
            id : user._id,
            username : user.username,
            email: user.email
        }
    })

}


/**
 * @name userLoginController
 * @description login user expect email and password in the requist body
 * @access Public
 */

async function loginUserController(req, res) {
    const {email, password}=req.body;
    
    if(!email || !password) return res.status(400).json({message : "Please provide the email and password."})
    
    const user = await userModel.findOne({email})
    if(!user)return res.status(401).json({message : "User is not registred invalid Email."})
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) return res.status(400).json({ message : "Please enter the valid email & password."});

    const token = jwt.sign(
        {id : user._id, username : user.username},
        process.env.JWT_SECRET, 
        {expiresIn : "1d"}
    )

    res.cookie("token", token);

    res.status(200).json({
        message : "User logeIn successfull.",
        user:{
            id : user._id,
            username : user.username,
            email : user.email
        }
    })  
       
}



async function logoutUserConrtoller(req, res) {
    try{
        const token = req.cookies.token;

        if(token){
            await blacklistModel.create({token});
        }
        res.clearCookie("token");
        res.status(200).json({
            message : "User logged out successfully."
        })

    }catch(err){
        console.log("logout error : ", err) 
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserConrtoller
}


