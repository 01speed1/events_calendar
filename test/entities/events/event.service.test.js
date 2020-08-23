const {
  getAllEvents,
  createEvent,
  updateEvent,
  removeEvent,
} = require("../../../entities/events/event.service");

const Category = require("../../../entities/categories/category.model");
const Event = require("../../../entities/events/event.model");

describe("#getAllEvents", () => {
  it("should return the expected object", async () => {
    const categoryOne = await Category.create({ name: "category" });

    const eventOne = await Event.create({
      name: "Super party",
      date: new Date(),
      categoryID: categoryOne._id,
    });
    const eventTwo = await Event.create({
      name: "My birthday",
      date: new Date(),
      categoryID: categoryOne._id,
    });

    const response = await getAllEvents();

    expect(response).toHaveProperty("events");
    expect(response.events).toEqual(expect.any(Array));
    expect(response.events[0]).toHaveProperty("name", eventOne.name);
    expect(response.events[1]).toHaveProperty("name", eventTwo.name);
  });
});

describe("#createEvent", () => {
  it("should create a event with a message", async () => {
    const categoryOne = await Category.create({ name: "category" });

    const parameters = {
      name: "Super party",
      date: new Date(),
      categoryID: categoryOne._id,
    };

    const response = await createEvent(parameters);

    expect(response).toHaveProperty("message", "event created");
    expect(response).toHaveProperty("event");
    expect(response.event).toEqual(expect.any(Object));
    expect(response.event).toHaveProperty("name", 'Super party');
    expect(response.event).toHaveProperty("category", categoryOne.name);
  });
});

describe("#updateEvent", () => {
  it("should update an avent and add a message", async () => {
    const categoryOne = await Category.create({ name: "category" });
    const expectedDate = new Date(2020, 12, 30);

    const eventOne = await Event.create({
      name: "Super party",
      date: new Date(),
      categoryID: categoryOne._id,
    });

    const parameters = {
      id: eventOne._id,
      name: "Super party on sunday",
      date: expectedDate,
      categoryID: categoryOne._id,
    };

    const response = await updateEvent(parameters);

    expect(response).toHaveProperty("message", "event updated");
    expect(response).toHaveProperty("event");
    expect(response.event).toEqual(expect.any(Object));
    expect(response.event).toHaveProperty("name", "Super party on sunday");
    expect(response.event).toHaveProperty("category", categoryOne.name);
    expect(response.event).toHaveProperty("date", expectedDate);
  });
});

describe("#removeEvent", () => {
  it("should remove an event", async () => {
    const categoryOne = await Category.create({ name: "category" });

    const eventOne = await Event.create({
      name: "Super party",
      date: new Date(),
      categoryID: categoryOne._id,
    });

    const parameters = {
      id: eventOne._id,
    };

    const response = await removeEvent(parameters);

    expect(response).toHaveProperty("message", "event removed");
  });
});
