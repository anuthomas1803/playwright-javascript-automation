const { test,expect } = require("@playwright/test");

//Popup validations
test("Popup validations",async({page})=>{
    await page.goto("https://www.saucedemo.com/")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
    await expect(page.locator(".error-message-container.error")).toBeVisible()
    await page.goto("https://selenium.qabible.in/index.php")
    await page.getByRole("link",{name: "Alerts and Modals"}).click()
    await page.getByRole("link",{name: "Javascript Alert"}).click()
   
//await not needed for page.on . So, button click executes first then dialog 
    page.on("dialog",async dialog=>{
    await page.waitForTimeout(3000) // 3 seconds lag
    await dialog.accept()  // for OK
// await dialog.dismiss() //for cancel 


})  
    await page.locator(".btn.btn-warning").click() // click me button

   


    await page.getByRole("link",{name:"Others"}).hover()
//IFRAME
    await page.goto("https://demoqa.com/frames")
    const framepage = page.frameLocator("#frame1")
    console.log(await framepage.locator("#sampleHeading").textContent()) // locate text inside iframe
    await expect(framepage.locator("#sampleHeading")).toHaveText("This is a sample page")
    
     await page.goto("https://www.saucedemo.com/")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
     //prompt alert
 /* page.on("dialog",async dialog=>{
    console.log(dialog.message())
    await dialog.accept("Hello Anu")

})
 await page.getByRole("button",{name:"Click for Prompt Box"}).click()
    */
    await page.pause()  

})
