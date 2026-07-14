const express = require('express')
require('dotenv').config()
const db = require('../config/db.js')
const port = process.env.PORT || 3000
const userRoutes = require('../routes/userRoutes.js')

const app = express()

app.use(express.json())

app.use('/api', userRoutes)

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})