const mongoose = require('mongoose')
const Mongo_Uri = process.env.MONGO_URI

const connect_Db = ()=>{
    const connectParems = {
        useNewUrlParser: true,
    };
    mongoose.connect(Mongo_Uri,connectParems)
    .then(()=>{
        console.log("Successfully connected to database..")
    }).catch((err)=>{
        console.log("Con't connect to database "+err)
    })
}

module.exports = connect_Db