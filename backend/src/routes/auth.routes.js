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

module.exports = authRouter;