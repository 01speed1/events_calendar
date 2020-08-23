const { endpointStringBuilder } = require('../helpers/stringsHelper')

//Entities routes
const categoryRoutes = require('../entities/categories/category.route')
const eventRoutes = require('../entities/events/event.route')

const baseRouter = require('./base.route')

module.exports = (app) => {
  app.use(endpointStringBuilder('categories'), categoryRoutes)
  app.use(endpointStringBuilder('events'), eventRoutes)

  app.use(endpointStringBuilder(), baseRouter)

  app.get("*", (request, response) => response.status(404).json({message: "page not found"}) )
}






