const {test,expect}=require("@playwright/test");
test("First playwright test",async function() // Older method of defining test case
{
})
// {browser} parameter is called fixture
// 1. browser   context
test("Brower context playwright test", async({browser})=>{
const context=await browser.newContext() //context object created
const page = await context.newPage() // page object is created > refers to new tab
await page.goto("https://www.google.com")
console.log(await page.title())

await page.goto("https://www.saucedemo.com/")
await page.locator("#user-name").fill("standarduser")
await page.locator("#password").fill("secret_sauce")
await page.locator("#login-button").click()

console.log(await page.locator(".error-message-container.error").textContent()) //space replace with . al
await expect(page.locator(".error-message-container.error")).toHaveText("Epic sadface: Username and password do not match any user in this service")
await expect(page.locator(".error-message-container.error")).toContainText("Epic sadface")

const username =page.locator("#user-name")
const login = page.locator("#login-button")
await username.fill("") //clear username
await username.fill("standard_user")
await login.click()
console.log(await page.locator(".inventory_item_name").first().textContent()) // first index
console.log(await page.locator(".inventory_item_name").nth(1).textContent())//prints second element; 
console.log(await page.locator(".inventory_item_name").last().textContent())//prints last element
console.log(await page.locator(".inventory_item_name").allTextContents())//prints all elements located 
const product = page.locator(".inventory_item_name")
const count= await product.count(); // get the count of products
const productName= "Sauce Labs Backpack"
for(let i=0;i<count;i++){
    if(await product.nth(i).textContent()===productName) 
    {
   await page.locator(".inventory_item").nth(i).locator("text=Add to cart").click()
   break; //multiple selector with same name
    }
}
await page.pause()
})
//.only - runs only this test case. Here we dont see browser , only 

//1. page context . if only is used only that test gets executed
test("page playwright test",async({page})=>{
await page.goto("https://www.google.com")
console.log(await page.title())
await expect(page).toHaveTitle("Google")
await page.pause()  // page waits without closing and inspector opens
})
//npx playwright test --headed  to display the browser 
//Assertion is a conditional check 
// 10 == "10" loose equality 10 & "10"  :  returns true. datatype not considered.
// 10 === "10" strict equality : 10 & "10" - returns false. datatype will be compared

test("ui controls",async({page})=>{
await page.goto("https://selenium.qabible.in/check-box-demo.php")
await page.locator(".nav-item").nth(1).click()  //starts from  0th element 
await page.locator(".list-group-item").nth(1).click()
await page.locator("#gridCheck").check() //checkbox check or click can be used 
 expect(await page.locator("#gridCheck").isChecked()).toBeTruthy() //function should be executed first then only tobe truthy. so expect there
 //Radio button
await page.locator(".list-group-item").nth(2).click()
await page.locator("#inlineRadio1").check() //male radio button
await page.locator("#inlineRadio24").check() // 45 to 60
await expect(page.locator("#inlineRadio24")).toBeChecked()
await page.locator("//a[normalize-space()='Select Input']").click()
//Select Input
await page.locator(".list-group-item").nth(3).click()
await page.locator("#single-input-field").selectOption("Red") // Value is to be taken 
await expect(page.locator("#single-input-field")).toHaveValue("Red")
await page.locator("//a[normalize-space()='Form Submit']").click()
await page.locator("#validationCustom01").fill("Anu")
await page.locator("#validationCustom02").fill("Thomas")
await page.locator("#validationCustomUsername").fill("Anumol")
await page.locator("#validationCustom03").fill("Brampton")
await page.locator("#validationCustom04").fill("Ontario")
await page.locator("#validationCustom05").fill("L6Z 2W5")
await page.locator("#invalidCheck").check()
await page.locator(".btn.btn-primary").click()
await expect(page.locator("#message-one")).toHaveText("Form has been submitted successfully!")
//test case passes only when assertion passes.

//SIMPLE FORM DEMO
await page.locator(".list-group-item").nth(0).click()
await page.locator("#single-input-field").fill("Hello World")
await page.locator("#button-one").click()
await expect(page.locator("#message-one")).toHaveText("Your Message : Hello World")
await page.pause()
})

//Child Window & New Tab. Here browser context is to be used because session needs to be handled individually
test("Child window and new tab" , async({browser})=>{
const context = await browser.newContext()
const page = await context.newPage()
await page.goto("https://www.google.com")
const [newPage] =await Promise.all([
    context.waitForEvent('page'),
    page.evaluate(()=>window.open("https://www.saucedemo.com"))
])

const newTab = await context.newPage()
await newTab.goto("https://www.github.com")
console.log("Child Window and New Tab Opened Successfully !!")
await page.pause()

//codegen : Advanced feature of playWroight  
})// import { test, expect } from '@playwright/test';
//CODE GENERATED USING CODEGEN TOOL. terminal => npx playwright codegen https://www.saucedemo.com
test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('div').filter({ hasText: 'Accepted usernames are:' }).nth(4).click();
  await page.locator('body').press('ControlOrMeta+c');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sacuce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('div').nth(4).click();
  await page.locator('div').nth(4).click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="password"]').press('Enter');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Anumol ');
  await page.locator('.checkout_info').click();
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('Thomas');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('691531');
  await page.getByRole('form', { name: 'Checkout information' }).click();
  await page.locator('.error-message-container').click();
  await page.locator('.error-message-container').click();
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
});

//SPECIAL LOCATORS : locators with highest priority

test("Special locators" ,async({page})=>{
await page.goto("https://selenium.qabible.in/index.php")
await page.getByRole("link",{name:"Input Form"}).click() //  locating hyperlink & button
await page.getByRole("link",{name:"Checkbox Demo"}).click()
await page.getByLabel("Click on this check box").check()
await page.getByRole("link",{name:"Radio Buttons Demo"}).click()
await page.getByLabel("45 to 60").check()
await page.getByRole("link",{name:"Select Input"}).click()
await page.getByLabel("Select Color").selectOption("Red")


//FORM SUBMIT
await page.getByRole("link",{name:"Form Submit", exact:true}).click() // there are 2 form submit
await page.getByPlaceholder ("First name").fill("Anumol")      // get by => place holder 
await page.getByPlaceholder ("Last name").fill("Thomas")  
await page.getByPlaceholder ("Username").fill("AnuT")  
await page.getByPlaceholder ("City").fill("Kollam")  
await page.getByPlaceholder ("State").fill("Kerala")  
await page.getByPlaceholder ("Zip").fill("670395")  
await page.getByLabel("Agree to terms and conditions").check()
await page.getByRole("button",{name:"Submit form"}).click()
await expect(page.getByText("Form has been submitted successfully!")).toBeVisible()

await page.getByRole("link",{name:"Simple Form Demo"}).click()
await page.getByPlaceholder("Message").fill("Hello World") 
await page.getByRole("button",{name:"Show Message"}).click()
await expect(page.getByText("Your Message : Hello World")).toBeVisible()
await page.pause()
})

const year=1997
const month=11
const date=12
test("Calendar Validation",async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.getByRole("link",{name:"Date Pickers"}).click()
    await page.getByRole("link",{name:"Bootstrap Date Picker"}).click()
    await page.locator("#single-input-field").click()
 await page.locator(".datepicker-days th.datepicker-switch").click()
 await page.locator(".datepicker-months th.datepicker-switch").click()
 while(true){
    const currentdecade= await page.locator(".datepicker-years th.datepicker-switch").textContent() //range of years
    const startdecade= parseInt(currentdecade.split("-")[0])
    if(year>=startdecade && year<=startdecade+9){
        break; // no need to go to next or previous button ; exit while loop
    }
    if(year<startdecade){
    await page.locator(".datepicker-years th.prev").click() //click on previous arrow button
     }
   else{
    await page.locator(".datepicker-years th.next").click()
   }
  }
    await page.getByText(year.toString(),{exact:true}).click()//year selection
    await page.locator(".month").nth(month-1).click() // month selection, month is string in calendar but we have defined as number
    await page.getByText(date.toString(),{exact:true}).click()
    await page.pause()
})
