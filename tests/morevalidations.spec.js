const { test,expect } = require("@playwright/test");

//Popup validations
test("Popup validations",async({page})=>{
    await page.goto("https://www.saucedemo.com/")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
    await expect(page.locator(".error-message-container.error")).toBeVisible()
       
    await page.getByRole("link",{name:"Others"}).hover()
//IFRAME
    await page.goto("https://demoqa.com/frames")
    const framepage = page.frameLocator("#frame1")
    console.log(await framepage.locator("#sampleHeading").textContent()) // locate text inside iframe
    await expect(framepage.locator("#sampleHeading")).toHaveText("This is a sample page")
    
     await page.goto("https://www.saucedemo.com/")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
    

})

test.only("prompt dialog box", async ({page}) => {
    await page.goto("https://selenium.qabible.in/index.php");

    await page.getByRole("link", { name: "Alerts and Modals" }).click();
    await page.getByRole("link", { name: "Javascript Alert" }).click();
await page.getByRole("button", { name: "Click for Prompt Box" }).click();
    // Handle JavaScript prompt dialog
    page.once("dialog", async dialog => {     
      await dialog.accept("Hello Anu");
        console.log(dialog.message());
    })

    // Click the button that triggers the prompt
    await page.getByRole("button", { name: "Click for Prompt Box" }).click();
    await page.pause();
})

