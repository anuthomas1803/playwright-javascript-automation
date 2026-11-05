const config = ({
  testDir: "./tests",
  timeout:40*1000,         //error result after the given time
expect:{
timeout:30*1000    //assertion error timeout
},
reporter:"html",
use:{
  browserName : "chromium",
  headless : false // displays browser withou adding --headed while executing
}
})
module.exports=config