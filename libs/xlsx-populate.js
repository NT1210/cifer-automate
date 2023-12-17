const XlsxPopulate = require('xlsx-populate');
const path = require("path")
const { getDate } = require("../utils/utils")

async function writeToFile(extractedData, objToBeUpdated) {
    const fullDate = getDate()
    const templatePath = path.join(__dirname, "../", "template", "template.xlsx")
    const outputPath = path.join(__dirname, "../", `${fullDate} 中国番号.xlsx`)

    XlsxPopulate.fromFileAsync(templatePath)
        .then(workbook => {
            const sheet1 = workbook.sheet("Sheet1") 
            const sheet2 = workbook.sheet("Sheet2")

            for(let i=0; i<extractedData.length; i++){
                for(let j=0; j<10; j++){
                    sheet1.row(i+3).cell(j+2).value(extractedData[i][j])
                }
            }

            // If there're data to be updated
            if(objToBeUpdated.length > 0){
                let keys = Object.keys(objToBeUpdated[0])
               
                for(let k=0; k<objToBeUpdated.length; k++){
                    for(let l=0; l<10; l++){
                        sheet2.row(k+3).cell(l+2).value(objToBeUpdated[k][keys[l]])
                    }
                }   
            }

            return workbook.toFileAsync(outputPath)
        })
        
}




module.exports = {
    writeToFile
}