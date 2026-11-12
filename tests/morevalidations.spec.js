const { test,expect } = require("@playwright/test");

//Popup validations
test.only("Popup validations", async ({ page }) => {
   await page.goto("https://www.saucedemo.com/");
   await expect(page.locator(".error-message-container.error")).toBeHidden();
   await page.locator("#login-button").click();
   await expect(page.locator(".error-message-container.error")).toBeVisible();
 
//IFRAME
    await page.goto("https://demoqa.com/frames")
    const framepage = page.frameLocator("#frame1")
    console.log(await framepage.locator("#sampleHeading").textContent()) // locate text inside iframe
    await expect(framepage.locator("#sampleHeading")).toHaveText("This is a sample page")

// Simple & Confirmation Alerts
    await page.goto("https://selenium.qabible.in/index.php");
    await page.getByRole("link",{name:"Others"}).hover()
    await page.getByRole("link", { name: "Alerts and Modals" }).click();
    await page.getByRole("link", { name: "Javascript Alert" }).click();
    page.once("dialog", async dialog => {
        await page.waitForTimeout(3000);
        await dialog.accept();
       //await dialog.dismiss(); //Cancel Alert
    });
    await page.locator(".btn.btn-warning").click(); // Click the button that triggers the JavaScript alert
  
    
// Prompt Alert
    page.once("dialog", async dialog => {     
    await dialog.accept("Hello Anu");
        console.log(dialog.message());
    })
    await page.getByRole("button", { name: "Click for Prompt Box" }).click(); // Click the button that triggers the prompt
   await page.pause();
});