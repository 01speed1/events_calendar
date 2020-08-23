require("dotenv").config();
const Category = require("../../entities/categories/category.model");
const { response } = require("express");

const {
  findBy,
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../../lib/modelBuilder")(Category);

describe("#findBy", () => {
  it("should find a expected document", async () => {
    let categoryOne = await Category.create({ name: "Carnicos" });

    const response = await findBy({ name: categoryOne.name });

    expect(response).toEqual(expect.any(Array));
    expect(response.length).toBe(1);
    expect(response[0]).toHaveProperty("name", categoryOne.name);
  });
});

describe("#getAll", () => {
  it("should found the complete collection", async () => {
    let categoryOne = await Category.create({ name: "Carnicos" });
    let categoryTwo = await Category.create({ name: "Lacteos" });

    const response = await getAll();

    expect(response).toEqual(expect.any(Array));
    expect(response.length).toStrictEqual(2);
    expect(response[0]).toHaveProperty("name", categoryOne.name);
    expect(response[1]).toHaveProperty("name", categoryTwo.name);
  });
});

describe("#getOne", () => {
  it("should found a document", async () => {
    let categoryOne = await Category.create({ name: "Carnicos" });

    const response = await getOne({ _id: categoryOne._id });

    expect(response).toEqual(expect.any(Object));
    expect(response._id).toStrictEqual(categoryOne._id)
    expect(response.name).toStrictEqual("Carnicos")
  });
});

describe("#create", () => {
  it("should create a document", async () => {
    let response = await create({ name: "Vegetales" });

    expect(response).toEqual(expect.any(Object));
    expect(response.name).toStrictEqual("Vegetales")
  });
});

describe("#update", () => {
  it("should update a document", async () => {
    let categoryOne = await create({ name: "Vegetales" });

    const response = await update(categoryOne._id, { name: 'Tools' })

    expect(response).toEqual(expect.any(Object));
    expect(response._id).toStrictEqual(categoryOne._id)
    expect(response.name).toStrictEqual("Tools")
  });
});

describe("#remove", () => {
  it("should remove a document", async () => {
    expect(await getAll()).toHaveLength(0)
    let categoryOne = await create({ name: "Vegetales" });

    expect(await getAll()).toHaveLength(1)

    const response = await remove(categoryOne._id)

    expect(await getAll()).toHaveLength(0)
    expect(response).toEqual(expect.any(Object));
    expect(response._id).toStrictEqual(categoryOne._id)
    expect(response.name).toStrictEqual("Vegetales")
  });
});
