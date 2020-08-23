require("dotenv").config();
const axios = require("axios");

const Category = require("../../../entities/categories/category.model");

const port = process.env.NODE_PORT || 8080;
const basePath = `http://localhost:${port}/api`;

describe("GET@/api/categories", () => {
  it("should get all categories ", async () => {
    let categoryOne = await Category.create({ name: "Carnicos" });
    let categoryTwo = await Category.create({ name: "Lacteos" });

    const response = await axios.get(`${basePath}/categories`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('categories', expect.any(Array) )

    expect(response.data.categories[0]).toHaveProperty('name', categoryOne.name)
    expect(response.data.categories[1]).toHaveProperty('name', categoryTwo.name)
  });
});

describe("POST@/api/categories", () => {
  it("should create a category in the DB", async () => {
    const response = await axios.post(`${basePath}/categories`, {
      name: "Party",
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("message", "category created");
    expect(response.data).toHaveProperty("category.name", "Party");
  });
});
