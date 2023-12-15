

function coordinateObj(arr){

    let ArrToBeReturned = []

    try{
        for(let unitArr of arr){
            
            let tempObj = {}

            tempObj["orderNum"] = parseInt(unitArr[0])
            tempObj["country"] = unitArr[1]
            tempObj["category"] = unitArr[2]
            tempObj["chinaRegNo"] = unitArr[3]
            tempObj["overseasRegNo"] = unitArr[4]
            tempObj["name"] = unitArr[5]
            tempObj["address"] = unitArr[6]
            tempObj["regDate"] = unitArr[7]
            tempObj["regExpiryDate"] = unitArr[8]
            tempObj["status"] = unitArr[9]

            ArrToBeReturned.push(tempObj)
            tempObj = {}
        }
    }catch (err){
        console.error(err)
    }
    
    return ArrToBeReturned
}





module.exports = {
    coordinateObj
}