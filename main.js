
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

        let startTime = Date.now()

        //extract data from cifer singlewindow
        const extractedData = await extract()
        console.log(green("[*] Data extraction completed."))

        // create mongoDB documents
        const docsBefore = await coordinateObj(extractedData)
      
        const toBeAdded_toBeUpdatedArrs = await validateDocument(docsBefore) // returns array including objToBeAdded, objToBeUpdated
        const objToBeAdded = toBeAdded_toBeUpdatedArrs[0]
        const objToBeUpdated = toBeAdded_toBeUpdatedArrs[1]
        const objDeleted = toBeAdded_toBeUpdatedArrs[2]

        if(objToBeAdded.length > 0) {
            const docToBeAdded = await Cifer.create(objToBeAdded)
            console.log(green(`${objToBeAdded.length} documents have been added.`))
        }else{
            console.log(red(`No ducuments have been added.`))
        }

        if(objToBeUpdated.length > 0){
            console.log(green(`${objToBeUpdated.length} documents have been updated.`))
        }else{
            console.log(red(`No ducuments have been updated.`))
        }

        if(objDeleted.length > 0){
            console.log(green(`${objDeleted.length} documents have been deleted.`))
        }else{
            console.log(red(`No ducuments have been deleted.`))
        }
    
        // output extractedData to template excel file.
        await writeToFile(extractedData, objToBeUpdated, objToBeAdded, objDeleted)

        // get disconnected from MongoDB
        await disconnect()

        console.log(green(`[*] All the process have been completed. It took ${(Date.now()-startTime)/1000} sec.`))

        // return extractedData

    }catch(err){
        console.error(err)
    }
}



main()

