const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
  response.json({ message: 'Welcome to Events Calendar' })
})

module.exports = router