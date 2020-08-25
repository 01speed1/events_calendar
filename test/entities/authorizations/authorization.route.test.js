require("dotenv").config();

const axios = require("axios");

const port = process.env.NODE_PORT || 8080;
const basePath = `http://localhost:${port}/api`;
const authPath = `${basePath}/auth`;

describe("GET@/auth", () => {
  it("should return the google auth path", async () => {

    console.log(authPath)

    const response = await axios.get(authPath);

    expect(response.data).toHaveProperty('authPath')
  })
})