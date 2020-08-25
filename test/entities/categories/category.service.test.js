const Category = require("../../../entities/categories/category.model")
const {
  createCategory,
  getAllCategory
} = require("../../../entities/categories/category.service");

describe("#getAllCategories", () => {
  it("should return all categories", async () => {
    await Category.create({ name: "Carnicos" });
    await Category.create({ name: "Lacteos" });
    await Category.create({ name: "Tools" });

    const response = await getAllCategory()

    expect(response).toHaveProperty('categories')
    expect(response.categories).toEqual(expect.any(Array))
    expect(response.categories).toHaveLength(4)
  })
})

describe("#createCategory", () => {
  describe("when receive required parameters", () => {

    const requiredParameters = { name: "Tools" };

    it("should return a promise", () => {
      expect(createCategory(requiredParameters)).toEqual(expect.any(Promise))
    })

    it("should create a category", async () => {
      const response = await createCategory(requiredParameters);

      expect(response).toHaveProperty( 'message', "category created")
      expect(response).toHaveProperty( 'category.name', 'Tools')
    });
  });

  describe("when not receive required parameters", () => {

    it("should create a category", async () => {
      const response = await createCategory();

      expect(response).toHaveProperty( 'errors.name.required', 'name is required')
    });
  });

});