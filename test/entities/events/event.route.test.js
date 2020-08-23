require("dotenv").config();

const Category = require("../../../entities/categories/category.model");
const Event = require("../../../entities/events/event.model");

const axios = require("axios");

const port = process.env.NODE_PORT || 8080;
const basePath = `http://localhost:${port}/api`;
const eventsPath = `${basePath}/events`;

console.log(eventsPath)

describe("GET@/events", () => {
  it("should return a message with status 200 and all events", async () => {
    const categoryOne = await Category.create({ name: "C1" });
    const categoryTwo = await Category.create({ name: "C2" });

    const eventOne = await Event.create({
      date: new Date(),
      name: "A super event",
      categoryID: categoryOne._id
    });
    const eventTwo = await Event.create({
      date: new Date(),
      name: "A super duper event",
      categoryID: categoryTwo._id
    });

    const response = await axios.get(eventsPath);

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      events: [
        { date: eventOne.date, name: eventOne.name, category: categoryOne._id },
        { date: eventTwo.date, name: eventTwo.name, category: categoryTwo._id },
      ],
    });
  });
});

describe("POST@/events", () => {
  it("should return a message with status 200 and the new event data", async () => {
    const categoryOne = await Category.create({ name: "Party" });
    const expectedDate = new Date(2020, 7, 20, 17, 30)

    const parameters = {
      name: "A super mega party",
      date: expectedDate,
      categoryID: categoryOne._id,
    };

    const response = await axios.post(eventsPath, parameters);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("message", "event created");
    expect(response.data.event).toHaveProperty("name", "A super mega party");
    expect(response.data.event).toHaveProperty("date", expectedDate);
    expect(response.data.event).toHaveProperty("categoryID", categoryOne._id);
  });
});

describe("PUT@/events", () => {
  it("should update the event", async () => {
    const categoryOne = await Category.create({ name: "Party" });
    const categoryTwo = await Category.create({ name: "Funeral" });

    const expectedDate = new Date(2020, 12, 12, 11, 30)

    const eventOne = await Event.create({
      name: "A super mega party",
      date: new Date(2020, 7, 20, 17, 30),
      categoryID: categoryOne._id,
    });

    const parameters = {
      id: eventOne._id,
      name: "a super funny funeral",
      date: expectedDate,
      categoryID: categoryTwo._id
    }

    const response = await axios.put(eventsPath, parameters);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("message", "event updated");
    expect(response.data.event).toHaveProperty("name", "a super funny funeral");
    expect(response.data.event).toHaveProperty("date", expectedDate);
    expect(response.data.event).toHaveProperty("categoryID", categoryOne._id);
  })
})

describe("DELETE@/events", () => {
  it("should remove the event", async () => {
    const categoryOne = await Category.create({ name: "Party" });

    const eventOne = await Event.create({
      name: "A super mega party",
      date: new Date(2020, 7, 20, 17, 30),
      categoryID: categoryOne._id,
    });

    const response = await axios.delete(eventsPath, { id: eventOne._id });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("message", "event removed");
  })
})
