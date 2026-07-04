const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")

//It is js doc comment.
/**
 * @route POST /api/auth/register
 * @descriptoin Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController)



/**
 * @route POST /api/auth/login
 * @description login only registered user
 * @access Public
 */

authRouter.post("/login", authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description clear the token from user cookies and add the token inside blacklist 
 * @access Public
 */

authRouter.get("/logout", authController.logoutUserConrtoller);


module.exports = authRouter;