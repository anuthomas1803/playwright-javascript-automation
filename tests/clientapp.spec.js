const {test,expect} =require("@playwright/test");       //wait function

test("clientapp login" , async({page})=>{
await page.goto("https://www.saucedemo.com/")
await page.locator("#user-name").fill("standard_user")
await page.locator("#password").fill("secret_sauce")
await page.locator("#login-button").click()

await page.waitForLoadState("networkidle") //keeps the network idle 
await page.locator(".inventory_item_name").first().waitFor()
console.log(await page.locator(".inventory_item_name").allTextContents())
//Handling multiple items with same name
const product=await page.locator(".inventory_item_name")
const productName="Sauce Labs Backpack"  // Actually , product is given during rumtime
const count=await product.count()  // function so await is required
for(let i=0;i<count;i++)
{
    if(await product.nth(i).textContent()===productName){
        await page.locator(".inventory_item").nth(i).locator("text=Add to cart").click()     //whole card should be located 
        break
    }
}
await page.locator("#shopping_cart_container").click()
//await page.locator(".inventory_item_name").waitFor()
await expect(page.locator(".inventory_item_name")).toBeVisible() //Assert
await page.locator("#checkout").click()
await page.locator("#first-name").fill("Anumol")
await page.locator("#last-name").fill("Thomas")
await page.locator("#postal-code").fill("691531")
await page.locator("#continue").click()
await page.locator(".inventory_item_name").waitFor()
// print item value
console.log(await page.locator(".summary_subtotal_label").textContent())
await expect(page.locator(".summary_subtotal_label")).toBeVisible()
await page.locator("#finish").click()
await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
await page.pause()
})
//debug mode : npx playwright test clientapp.spec.js --debug
// in debug mode step over has to be given for line by line execution

//ui mode : npx playwright test --ui  
//allows traces , line by line screenshots

//Automate using special locators
