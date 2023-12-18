const XlsxPopulate = require('xlsx-populate');
const path = require("path")
const { getDate } = require("../utils/utils")

async function writeToFile(extractedData, objToBeUpdated, objToBeAdded) {
    const fullDate = getDate()
    const templatePath = path.join(__dirname, "../", "template", "template.xlsx")
    const outputPath = path.join(__dirname, "../", `${fullDate} 中国番号.xlsx`)

    XlsxPopulate.fromFileAsync(templatePath)
        .then(workbook => {
            const sheet1 = workbook.sheet("Sheet1") // all
            const sheet2 = workbook.sheet("Sheet2") // updated
            const sheet3 = workbook.sheet("Sheet3") // newly added

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
                        // if the updated prop is in the object, add style "bold"
                        if(objToBeUpdated[k].changedIdxs.indexOf(l) !== -1){
                            sheet2.row(k+3).cell(l+2).value(objToBeUpdated[k][keys[l]]).style("bold", true)
                        }else{
                            sheet2.row(k+3).cell(l+2).value(objToBeUpdated[k][keys[l]])
                        }
                    }
                }   
            }

            // If there're data newly added
            if(objToBeAdded.length > 0){
                let keys = Object.keys(objToBeAdded[0])
               
                for(let k=0; k<objToBeAdded.length; k++){
                    for(let l=0; l<10; l++){
                        // if the updated prop is in the object, add style "bold"
                        sheet3.row(k+3).cell(l+2).value(objToBeAdded[k][keys[l]])
                    }
                }   
            }


            return workbook.toFileAsync(outputPath)
        })
        
}




module.exports = {
    writeToFile
}