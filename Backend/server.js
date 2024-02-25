const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
require('dotenv').config();
const connect_Db = require('./Config/Db')
const cors = require('cors')

/* Handling cors problem */
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('This is home page')
})

connect_Db()

app.listen(PORT,()=>{
    console.log("Server is started..")
})