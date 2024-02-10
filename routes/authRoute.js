const { login, register, logout, addEvent } = require("../controller/authController")
const authRouter = require("express").Router()

authRouter

    .post('/login', login)
    .post('/register', register)
    .post('/logout', logout)


module.exports = authRouter  