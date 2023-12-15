
const { extract } = require("./libs/puppeteer")
const { writeToFile } = require("./libs/xlsx-populate")
const { connect, disconnect } = require("./db/db")
const mongoose = require("mongoose")
const { Cifer } = require("./db/models/cifer")
const { coordinateObj } = require("./utils/utils")


async function main(){
    try{
        // get connected to MongoDB
        await connect()


        //extract data from cifer singlewindow
        // const extractedData = await extract()

        // create mongoDB documents
        // const docsBefore = await coordinateObj(extractedData)
        // const docs = await Cifer.create(docsBefore)
        // if(docs) console.log("[*]New documents created")


        // //output data to excel file
        // writeToFile(extractedData)

        // below output extractedData to template excel file. and hopefully get it connected to DB.


        // get disconnected from MongoDB
        await disconnect()

        // return extractedData

    }catch(err){
        console.error(err)
    }
}



main()

