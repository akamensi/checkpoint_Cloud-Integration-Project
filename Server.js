const express = require('express')
const ConnectDB = require('./Config/ConnectDB')
const userRouter = require('./Route/User')

const app = express()

require('dotenv').config()

ConnectDB()

app.use(express.json())

app.use('/api/user',userRouter)

app.listen(process.env.port, console.log(`Server is runnig on the port ${process.env.port}!`))
