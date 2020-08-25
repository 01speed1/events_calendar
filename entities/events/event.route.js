const express = require("express");
const eventsRouter = express.Router();
const eventRouter = express.Router();

const {
  createEvent,
  getAllEvents,
  removeEvent,
  updateEvent,
  getOneEvent
} = require("./event.service");

eventsRouter
  .route("/")
  .get(async ({}, response) => {
    response.json(await getAllEvents());
  })
  .post(async ({ body }, response) => {
    response.json(await createEvent(body));
  })
  .put(async ({ body }, response) => {
    response.json(await updateEvent(body));
  });

eventRouter.route("/:id")
  .get(async ({ params }, response) => {
    response.json(await getOneEvent(params));
  })
  .delete(async ({ params }, response) => {
    response.json(await removeEvent(params));
  });

module.exports = {eventsRouter, eventRouter};
