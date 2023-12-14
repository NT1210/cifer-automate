
const {extract} = require("./utils/puppeteer")

async function main(){
    const extractedData = await extract()

    // below output extractedData to template excel file. and hopefully get it connected to DB.

    // return extractedData
}


main()