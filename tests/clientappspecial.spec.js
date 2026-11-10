//client app test cases using special locators 

const{test,expect}=require("@playwright/test")
test("Clientapp login using special locators", async({page})=>{
    page.goto("https://www.saucedemo.com/")
    await page.getByPlaceholder("Username").fill("standard_user")
    await page.getByPlaceholder("Password").fill("secret_sauce")
    await page.getByRole("Button",{name:"Login"}).click()

    //Print the list of all products 
    await page.waitForLoadState("networkidle") 
    await page.locator(".inventory_item_name").first().waitFor()
    console.log(await page.locator(".inventory_item_name").allTextContents())

   //Add a product to cart 
   const product = page.locator(".inventory_item_name")
   const productName="Sauce Labs Backpack"
   const count=await product.count() // await since it is a function (asynchronous)
   for(let i=0;i<count;i++)
   {
    if(await product.nth(i).textContent()===productName){
        await page.locator(".inventory_item").nth(i).getByRole("Button",{name:"Add to cart"}).click()
        break
    }
   }
   await page.locator(".shopping_cart_link").click();
   await expect(page.locator(".inventory_item_name")).toBeVisible()
   await page.getByRole("button",{name:"Checkout"}).click()
   await expect(page.getByText("Checkout: Your Information")).toBeVisible() 
   await page.getByPlaceholder("First Name").fill("Anumol")
   await page.getByPlaceholder("Last Name").fill("Thomas")
   await page.getByPlaceholder("Zip/Postal Code").fill("67704")
   await page.getByRole("button",{name:"continue"}).click()

   await page.locator(".inventory_item_name").waitFor()
   console.log(await page.getByText("Checkout: Overview").textContent()) //might show promise pending if await is not used 
   console.log(await page.getByText("Item total:").textContent())
   await page.getByRole("button",{name:"finish"}).click()
   await expect(page.getByText("Thank you for your order!")).toBeVisible()
   await page.pause()
})