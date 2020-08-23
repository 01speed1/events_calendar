const express = require("express");
const router = express.Router()

const { createCategory, getAllCategory } = require("./category.service")

router.get("/", async ({}, response) => {

  const categoriesList = await getAllCategory()

  response.json(categoriesList)
})

router.post("/", async ({ body }, response) => {

  const newCategory = await createCategory(body)

  response.json(newCategory)
})

module.exports = router