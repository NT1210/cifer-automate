
const { extract } = require("./libs/puppeteer")
const { writeToFile } = require("./libs/xlsx-populate")
const { connect, disconnect } = require("./db/db")
const mongoose = require("mongoose")
const { Cifer } = require("./db/models/cifer")
const { coordinateObj, validateDocument } = require("./utils/utils")
const { green, red } = require("console-log-colors")


async function main(){
    try{
        // get connected to MongoDB
        await connect()


        //extract data from cifer singlewindow
        const extractedData = await extract()

        // create mongoDB documents
        const docsBefore = await coordinateObj(extractedData)
      
        const toBeAdded_toBeUpdatedArrs = await validateDocument(docsBefore) // returns array including objToBeAdded, objToBeUpdated
        const objToBeAdded = toBeAdded_toBeUpdatedArrs[0]
        const objToBeUpdated = toBeAdded_toBeUpdatedArrs[1]

        if(objToBeAdded.length > 0) {
            const docToBeAdded = await Cifer.create(objToBeAdded)
            console.log(green(`${objToBeAdded.length} documents have been added.`))
        }else{
            console.log(red(`No ducuments have been added.`))
        }

        if(objToBeUpdated.length > 0){
            const docToBeUpdated = await Cifer.create(objToBeUpdated)
            console.log(green(`${objToBeUpdated.length} documents have been updated.`))
        }else{
            console.log(red(`No ducuments have been updated.`))
        }
        
        
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

