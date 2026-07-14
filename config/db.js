const mongoose = require('mongoose')

const mongoUri = process.env.MONGO_CONNECTION_STRING

mongoose.connect(mongoUri)
  .then(()=>{
    console.log("Mongo DB Connected");    
  }).catch((err)=>{
    console.log("MongoDB Connection Error: ", err)
  })