const {
  getAllEvents,
  createEvent,
  updateEvent,
  removeEvent,
  getOneEvent
} = require("../../../entities/events/event.service");

const Category = require("../../../entities/categories/category.model");
const Event = require("../../../entities/events/event.model");

describe("#getOneEvent", () => {
  it("should return a event", async () => {
    const categoryOne = await Category.create({ name: "category" });

    const eventOne = await Event.create({
      name: "Super party",
      date: new Date(),
      categoryID: categoryOne._id,
      htmlLink: 'a super link',
      googleCalendarID: '1Q2W3E34R'
    });

    const response = await getOneEvent({ id: eventOne._id })

    expect(response).toHaveProperty("event");
    expect(response.event).toHaveProperty("name", eventOne.name);
    expect(response.event).toHaveProperty("htmlLink", eventOne.htmlLink);
    expect(response.event).toHaveProperty("googleCalendarID", eventOne.googleCalendarID);
  })
} )

describe("#getAllEvents", () => {
  it("should return the expected object", async () => {
    const categoryOne = await Category.create({ name: "category" });

    const eventOne = await Event.create({
      name: "Super party",
      date: new Date(),
      categoryID: categoryOne._id,
      htmlLink: 'a super link',
      googleCalendarID: '1Q2W3E34R'
    });
    const eventTwo = await Event.create({
      name: "My birthday",
      date: new Date(),
      categoryID: categoryOne._id,
      htmlLink: 'a super link 2',
      googleCalendarID: '1Q2W3E34R'
    });

    const response = await getAllEvents();

    expect(response).toHaveProperty("events");
    expect(response.events).toEqual(expect.any(Array));
    expect(response.events[0]).toHaveProperty("name", eventOne.name);
    expect(response.events[1]).toHaveProperty("name", eventTwo.name);
    expect(response.events[0]).toHaveProperty("htmlLink", eventOne.htmlLink);
    expect(response.events[1]).toHaveProperty("htmlLink", eventTwo.htmlLink);
    expect(response.events[0]).toHaveProperty("googleCalendarID", eventOne.googleCalendarID);
    expect(response.events[1]).toHaveProperty("googleCalendarID", eventTwo.googleCalendarID);
  });
});

describe("#createEvent", () => {
  it("should create a event with a message", async () => {
    const categoryOne = await Category.create({ name: "category" });

    const parameters = {
      name: "Super party",
      date: new Date(),
      categoryID: categoryOne._id,
      htmlLink: 'a super link',
      googleCalendarID: '1Q2W3E34R'
    };

    const response = await createEvent(parameters);

    expect(response).toHaveProperty("message", "event created");
    expect(response).toHaveProperty("event");
    expect(response.event).toEqual(expect.any(Object));
    expect(response.event).toHaveProperty("name", 'Super party');
    expect(response.event).toHaveProperty("category", categoryOne.name);
    expect(response.event).toHaveProperty("htmlLink", 'a super link');
    expect(response.event).toHaveProperty("googleCalendarID", '1Q2W3E34R');
  });
});

describe("#updateEvent", () => {
  it("should update an avent and add a message", async () => {
    const categoryOne = await Category.create({ name: "category"});
    const expectedDate = new Date(2020, 12, 30);

    const eventOne = await Event.create({
      name: "Super party",
      date: new Date(),
      categoryID: categoryOne._id,
      htmlLink: 'a super link'
    });

    const parameters = {
      id: eventOne._id,
      name: "Super party on sunday",
      date: expectedDate,
      categoryID: categoryOne._id,
      htmlLink: 'a new super link'
    };

    const response = await updateEvent(parameters);

    expect(response).toHaveProperty("message", "event updated");
    expect(response).toHaveProperty("event");
    expect(response.event).toEqual(expect.any(Object));
    expect(response.event).toHaveProperty("name", "Super party on sunday");
    expect(response.event).toHaveProperty("category", categoryOne.name);
    expect(response.event).toHaveProperty("date", expectedDate);
    expect(response.event).toHaveProperty("htmlLink", 'a new super link');
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
