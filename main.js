
const puppeteer = require("puppeteer")

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

async function main(){
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\Chrome.exe"
    })
    
    const page = await browser.newPage()

    await page.exposeFunction("sliceByNumber", (array, number) => {
        const length = Math.ceil(array.length / number)
        return new Array(length).fill().map((_, i) =>
          array.slice(i * number, (i + 1) * number)
        )
    })
    
    await page.goto("https://ciferquery.singlewindow.cn/")

    await page.type('#registerTypeName', "18");
    await delay(1500)
    await page.type('#countryName', "俄罗斯-Russia");
    await delay(1500)
    await page.click('span[id="chaxun"]')


    const lastPageNum = await page.evaluate(() => {
        let links = document.querySelectorAll(".page-item")
        return Array.from(links).slice(-2)[0].textContent
    })


    let extractedArr = []

    for(let i=0; i<lastPageNum; i++){
        const dataPerPage = await page.evaluate(() => {

            let tableBody = document.querySelectorAll("tbody td")
            let temparr = []
            tableBody.forEach(ele => temparr.push(ele.textContent))
            temparr.shift()
            let slicedArr = window.sliceByNumber(temparr, 10)

            return slicedArr
        })

        extractedArr.push(dataPerPage)
    
        delay(1500)
        await page.click(".page-next a")
    }

    flattedArr = extractedArr.flat()
    console.log(flattedArr)

    browser.close()


    return flattedArr
}


main()