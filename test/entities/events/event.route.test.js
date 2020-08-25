require("dotenv").config();

const Category = require("../../../entities/categories/category.model");
const Event = require("../../../entities/events/event.model");

const axios = require("axios");

const port = process.env.NODE_PORT || 8080;
const basePath = `http://localhost:${port}/api`;
const eventsPath = `${basePath}/events`;
const eventPath = `${basePath}/event`;

describe("GET@/event", () => {
  it("should return the found event", async () => {
    const categoryOne = await Category.create({ name: "C1" });

    const eventOne = await Event.create({
      date: new Date(),
      name: "A super event",
      categoryID: categoryOne._id,
    });

    const response = await axios.get(`${eventPath}/${eventOne._id}`);

    expect(response.status).toBe(200);
    expect(response.data.event).toHaveProperty("name", eventOne.name);
    expect(response.data.event).toHaveProperty("categoryID", categoryOne._id.toString());
  });
});

describe("GET@/events", () => {
  it("should return a message with status 200 and all events", async () => {
    const categoryOne = await Category.create({ name: "C1" });
    const categoryTwo = await Category.create({ name: "C2" });

    const eventOne = await Event.create({
      date: new Date(),
      name: "A super event",
      categoryID: categoryOne._id,
    });
    const eventTwo = await Event.create({
      date: new Date(),
      name: "A super duper event",
      categoryID: categoryTwo._id,
    });

    const response = await axios.get(eventsPath);

    expect(response.status).toBe(200);
    expect(response.data.events[0]).toHaveProperty("name", eventOne.name);
    expect(response.data.events[0]).toHaveProperty(
      "category",
      categoryOne.name
    );
    expect(response.data.events[1]).toHaveProperty("name", eventTwo.name);
    expect(response.data.events[1]).toHaveProperty(
      "category",
      categoryTwo.name
    );
  });
});

describe("POST@/events", () => {
  it("should return a message with status 200 and the new event data", async () => {
    const categoryOne = await Category.create({ name: "Party" });
    const expectedDate = new Date(2020, 7, 20, 17, 30);

    const parameters = {
      name: "A super mega party",
      date: expectedDate,
      categoryID: categoryOne._id,
    };

    const response = await axios.post(eventsPath, parameters);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("message", "event created");
    expect(response.data.event).toHaveProperty("name", "A super mega party");
    expect(new Date(response.data.event.date)).toEqual(expectedDate);
    expect(response.data.event).toHaveProperty("category", categoryOne.name);
  });
});

describe("PUT@/events", () => {
  it("should update the event", async () => {
    const categoryOne = await Category.create({ name: "Party" });
    const categoryTwo = await Category.create({ name: "Funeral" });

    const expectedDate = new Date(2020, 12, 12, 11, 30);

    const eventOne = await Event.create({
      name: "A super mega party",
      date: new Date(2020, 7, 20, 17, 30),
      categoryID: categoryOne._id,
    });

    const parameters = {
      id: eventOne._id,
      name: "a super funny funeral",
      date: expectedDate,
      categoryID: categoryTwo._id,
    };

    const response = await axios.put(eventsPath, parameters);

    expect(response.status).toBe(200);

    expect(response.data).toHaveProperty("message", "event updated");
    expect(response.data.event).toHaveProperty("name", "a super funny funeral");
    expect(new Date(response.data.event.date)).toEqual(expectedDate);
    expect(response.data.event).toHaveProperty("category", categoryTwo.name);
  });
});

describe("DELETE@/event", () => {
  it("should remove the event", async () => {
    const categoryOne = await Category.create({ name: "Party" });

    const eventOne = await Event.create({
      name: "A super mega party",
      date: new Date(2020, 7, 20, 17, 30),
      categoryID: categoryOne._id,
    });

    const response = await axios.delete(`${eventPath}/${eventOne._id}`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("message", "event removed");
  });
});
