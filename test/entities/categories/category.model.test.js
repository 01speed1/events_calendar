require("dotenv").config();

const Category = require('../../../entities/categories/category.model')

describe("when I need to create a category", () => {

  it("should save a category in the DB", async () => {
    const response = await Category.create({ name: 'Party' })

    expect(response).toHaveProperty('name', 'Party')
  })
})