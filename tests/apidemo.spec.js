const { test,expect } = require("@playwright/test");
test("get request- retrieve data", async({request})=>{
    const response= await request.get("https://jsonplaceholder.typicode.com/users")
    expect(response.ok()).toBeTruthy() //response success check
    const body= await response.json()
    expect(body.length).toBeGreaterThan(0) //checks if body array has at least 1 element
    console.log(body[0].name) //body is an array of Objects
  // console.log(body[1].name) // Prints the name of the second object.
  //  console.log(body[0]) // Prints all properties of first object.
} )

test.only("post request- create data", async({request})=>{
  const response=await request.post("https://jsonplaceholder.typicode.com/users",{
    data:{
      name:'Anu',
      email:'anuthomas@gmail.com',
      username:'Anumol'
    }
  })
  expect(response.status()).toBe(201)
  const responsebody=await response.json()
  expect(responsebody.name).toBe('Anu')
})



