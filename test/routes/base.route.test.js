require("dotenv").config();

const axios = require("axios")

const port = process.env.NODE_PORT || 8080
const basePath = `http://localhost:${port}`

describe("GET@/api", () => {
  it("should return a message with status 200", async () =>{
    const response = await axios.get(`${basePath}/api`)

    expect(response.status).toBe(200)
    expect(response.data).toMatchObject({ message: 'Welcome to Events Calendar' })

  })
})