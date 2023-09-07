const express = require('express')
const { Signup, Signin } = require('../Controlles/User')
const { validSignup, validation, validSignIn } = require('../Middelwares/Validaror')
const { IsAuth } = require('../Middelwares/IsAuth')

const userRouter = express.Router()

userRouter.post('/singup', validSignup,validation,Signup)

userRouter.post('/singin',validSignIn,validation,Signin)

userRouter.get('/getUser',IsAuth,(req,res)=>res.send(req.user))

module.exports = userRouter