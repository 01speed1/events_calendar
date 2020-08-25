const Event = require("./event.model");
const Category = require("../categories/category.model");

const { hasSomething } = require("../../helpers/objectsHelper");
const { remove, update, create } = require("../../lib/modelBuilder")(Event);
const { getOne: getOneCategory } = require("../../lib/modelBuilder")(Category);
const { required } = require("../../lib/errorBuilder");

const getOneEvent = async (parameters) => {
  let errors = {};
  const { id } = parameters;

  errors = required(errors, "id", id);

  if (hasSomething(errors)) return { errors };

  const {
    _id,
    name,
    date,
    categoryID,
    htmlLink,
    googleCalendarID,
  } = await Event.findById(id).exec();

  const event = { id: _id, name, date, categoryID, htmlLink, googleCalendarID };

  return { event };
};

const getAllEvents = async () => {
  const FoundEvents = await Event.find({})
    .populate("categoryID", "name")
    .exec();

  const events = FoundEvents.map(
    ({
      _id: id,
      name,
      date,
      categoryID: { name: categoryName },
      htmlLink,
      googleCalendarID,
    }) => ({
      id,
      name,
      date,
      category: categoryName,
      htmlLink,
      googleCalendarID,
    })
  );

  return { events };
};

const createEvent = async (parameters) => {
  let errors = {};
  const { name, date, categoryID, htmlLink, googleCalendarID } = parameters;

  errors = required(errors, "name", name);
  errors = required(errors, "date", date);
  errors = required(errors, "categoryID", categoryID);

  if (hasSomething(errors)) return { errors };

  const createdEvent = await create({
    name,
    date,
    categoryID,
    htmlLink,
    googleCalendarID,
  });

  const { name: categoryName } = await getOneCategory({ _id: categoryID });

  const event = { ...createdEvent._doc, category: categoryName };

  return { message: "event created", event };
};

const updateEvent = async (parameters) => {
  let errors = {};
  const { id, name, date, categoryID, htmlLink } = parameters;

  errors = required(errors, "id", id);
  errors = required(errors, "name", name);
  errors = required(errors, "date", date);
  errors = required(errors, "categoryID", categoryID);

  if (hasSomething(errors)) return { errors };

  const updatedEvent = await update(id, { name, date, categoryID, htmlLink });

  const { name: categoryName } = await getOneCategory({ _id: categoryID });

  const event = { ...updatedEvent._doc, category: categoryName };

  return { message: "event updated", event };
};

const removeEvent = async (parameters) => {
  let errors = {};
  const { id } = parameters;

  errors = required(errors, "id", id);

  if (hasSomething(errors)) return { errors };

  await remove(id);

  return { message: "event removed" };
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  removeEvent,
  getOneEvent,
};
