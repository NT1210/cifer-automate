const mongoose = require("mongoose")
const { green, cyan } = require('console-log-colors')
require("dotenv").config()


async function connect(){
    const url = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1`
    
    mongoose
    .connect(url)
    .then((res) => {
      console.log(green('[*] Connected to MongoDB.'));
    })
    .catch((err) => {
      console.log(err)
    })
}

async function disconnect(){
    mongoose.disconnect()
    .then(()=> console.log(cyan("[*] Disconnected from MongoDB.")))
    .catch((err) => console.error(err))
}


module.exports = {
    connect,
    disconnect
}