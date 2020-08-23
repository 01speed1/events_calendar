const express = require("express");
const router = express.Router()

const {  } = require("./event.service")

router.get("/", async ({}, response) => {
  response.json()
})

router.post("/", async ({ body }, response) => {
  response.json()
})

router.put("/", async ({ body }, response) => {
  response.json()
})

router.delete("/", async ({ body }, response) => {
  response.json()
})

module.exports = router