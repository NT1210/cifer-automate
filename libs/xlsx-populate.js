const XlsxPopulate = require('xlsx-populate');


async function writeToFile(extractedData) {

    XlsxPopulate.fromBlankAsync()
        .then(workbook => {
            const sheet_name_list  = workbook.SheetNames
            const sheet1 = workbook.sheet("Sheet1") 

            for(let i=0; i<extractedData.length; i++){
                for(let j=0; j<10; j++){
                    sheet1.row(i+3).cell(j+2).value(extractedData[i][j])
                }
            }

            return workbook.toFileAsync("./output.xlsx")
        })
        
}


module.exports = {
    writeToFile
}