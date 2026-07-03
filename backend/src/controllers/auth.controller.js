const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
        $or: [{userName},{email}]
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
module.exports = {registerUserController}