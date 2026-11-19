//import exceljs
const ExcelJS = require("exceljs")
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
       // console.log(cell.value)
    if(cell.value===selectValue){
        output.row=rownumber  // store the corresponding row number
        output.col=colnumber  //store the corresponding column number
    }
    })
})
return output // return output object i.e, row & column number
}

writeExcelFile("C:/Users/anuth/Downloads/Obsqura Testing.xlsx","Bradley Greer","Canada")
//funtion call 
