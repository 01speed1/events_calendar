require("dotenv").config();

const { mockDBConnection } = require('../../jestHelpers')

const Event = require('../../../entities/events/event.model')
const Category = require('../../../entities/categories/category.model')

describe("CRUD Event Model", () => {

  let mockCategoryOne = Category.create({name: 'One'})

  describe("when I need to create a Event", () => {
    it("should save a event in the DB", async () => {

      const categoryOne = await mockCategoryOne
      const eventDate = new Date(2020, 1, 13, 19, 30)

      const response = await Event.create({ name: 'Oscar birthday', date: eventDate, categoryID: categoryOne.id })

      expect(response).toHaveProperty('name', 'Oscar birthday')
      expect(response).toHaveProperty('date', eventDate)
      expect(response).toHaveProperty('categoryID', categoryOne._id)
    })
  })

  describe("when I need to list all events", () => {

    it("should list all events", async () => {

      const categoryOne = await mockCategoryOne

      const eventOne = await Event.create({ name: 'Oscar birthday', date: new Date(2020, 1, 13, 19, 30), categoryID: categoryOne.id })
      const eventTwo = await Event.create({ name: 'Juanita birthday', date: new Date(2020, 5, 20, 19, 30), categoryID: categoryOne.id })
      const eventThree = await Event.create({ name: 'Valentina birthday', date: new Date(2020, 8, 8, 19, 30), categoryID: categoryOne.id })

      const response = await Event.find()

      expect(response.length).toEqual(3)
    })
  })

  describe("when I need to update a event", () => {
    it("should update a event in the database", async () => {

    })
  })

  describe("when I need to delete a event", () => {
    it("should remove the event of the database", async () => {
      
    })
  })

})