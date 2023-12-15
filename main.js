
const {extract} = require("./libs/puppeteer")
const {writeToFile} = require("./libs/xlsx-populate")

async function main(){
    const extractedData = await extract()

    writeToFile(extractedData)

    // below output extractedData to template excel file. and hopefully get it connected to DB.
    // return extractedData
}



main()
