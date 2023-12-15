const mongoose = require("mongoose")
require("dotenv").config()


async function connect(){
    const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-cifer-automate.ygz2jt2.mongodb.net/?retryWrites=true&w=majority`
    mongoose
    .connect(url)
    .then((res) => {
      console.log('[*]Connected to MongoDB');
    })
    .catch((err) => {
      console.log(err)
    })
}

async function disconnect(){
    mongoose.disconnect()
    .then(()=> console.log("[*]Disconnected from MongoDB"))
    .catch((err) => console.error(err))
}


module.exports = {
    connect,
    disconnect
}