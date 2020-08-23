const { endpointStringBuilder } = require('../helpers/stringsHelper')

//Entities routes
const categoryRoutes = require('../entities/categories/category.route')
const { eventRouter, eventsRouter } = require('../entities/events/event.route')

const baseRouter = require('./base.route')

module.exports = (app) => {
  app.use(endpointStringBuilder('categories'), categoryRoutes)
  app.use(endpointStringBuilder('events'), eventsRouter)
  app.use(endpointStringBuilder('event'), eventRouter)

  console.log(endpointStringBuilder('event'))

  app.use(endpointStringBuilder(), baseRouter)

  app.get("*", (request, response) => response.status(404).json({message: "page not found"}) )
}






