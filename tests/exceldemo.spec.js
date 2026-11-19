const{test,expect}= require("@playwright/test")
const ExcelJS = require("exceljs")

test("Download and Edit Excel", async({page})=>{
    await page.goto("https://selenium.qabible.in/")
    await page.getByRole("link",{name:"Table"}).click()
    await page.getByRole("link",{name: "Table Data Download"}).click() 
   
    const downloadPromise = page.waitForEvent("download"); // wait for download event
    await page.getByRole("button", { name: "Excel" }).click();
    const download = await downloadPromise; //capture the downloaded file
    await download.saveAs("C:/Users/anuth/Downloads/assignment.xlsx"); //save file 
    console.log("Download completed");

   await writeExcelFile("C:/Users/anuth/Downloads/assignment.xlsx","Bradley Greer","Toronto")
   await page.pause()
})

test.only("Upload Excel", async({page})=>{
await page.goto("https://the-internet.herokuapp.com/upload")
const fileChooserPromise = page.waitForEvent("filechooser")
await page.locator("#file-upload").click(); 
const fileChooser=await fileChooserPromise 
await fileChooser.setFiles("C:/Users/anuth/Downloads/assignment.xlsx");

await page.locator("#file-submit").click();
await expect(page.getByText("File Uploaded!")).toBeVisible()
await page.pause()
})

async function writeExcelFile(filePath,selectValue,changeValue){
const workBook = new ExcelJS.Workbook() // creation of workbook object
 await workBook.xlsx.readFile(filePath) // the file is currently in downloads. change left slash to right slash
const workSheet=workBook.getWorksheet("Sheet1")
let output=await readExcelFile(workSheet,selectValue)
let cell=workSheet.getCell(output.row,output.col+2) // +2 is given to move to 2nd column i.e, office(position)
cell.value=changeValue   //cell.value="London"
await workBook.xlsx.writeFile(filePath) // permanentle changed
console.log("Value Changed")
}

async function readExcelFile(workSheet,selectValue)
{
    let output={row:-1,col:-1}
workSheet.eachRow((row,rownumber)=>{
    row.eachCell((cell,colnumber)=>{
    if(cell.value===selectValue){
        output.row=rownumber  // store the corresponding row number
        output.col=colnumber  //store the corresponding column number
    }
    })
})
return output 
}
