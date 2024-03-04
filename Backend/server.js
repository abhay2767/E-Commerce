const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
require('dotenv').config();
const connect_Db = require('./Config/Db')
const cors = require('cors')
const Product_Route = require('./Route/Product_Route')

/* Handling cors problem */
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('This is home page')
})

app.use('/api/',Product_Route)

connect_Db()

app.listen(PORT,()=>{
    console.log("Server is started..")
})