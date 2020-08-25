import ApiCalendar from "react-google-calendar-api";
import Axios from "axios";

import {
  API_URL_CATEGORIES,
  API_URL_EVENTS,
  API_URL_EVENT,
} from "../../../constants";

import {
  inputDateFormater,
  inputTimeFormater,
  add30Minutes,
  toISOFormat,
} from "../../../helpers/date.helper";

export const isANewEvent = (eventID) => eventID !== "new";

export const loadCategories = ({ setCategories }) => {
  Axios.get(API_URL_CATEGORIES)
    .then(({ data: { categories } }) => setCategories(categories))
    .catch(console.error);
};

export const setFoundEventData = ({
  eventID,
  setName,
  setDate,
  setTime,
  setcategoryID,
  setGoogleCalendarID,
  setHtmlLink,
}) => {
  Axios.get(`${API_URL_EVENT}/${eventID}`)
    .then(({ data: { event } }) => {
      setName(event.name);
      setDate(inputDateFormater(new Date(event.date)));
      setTime(inputTimeFormater(new Date(event.date)));
      setcategoryID(event.categoryID);
      setGoogleCalendarID(event.googleCalendarID);
      setHtmlLink(event.htmlLink);
    })
    .catch(console.error);
};

export const createEvent = (body = {}, setErrors) => {
  const calendarNewEvent = {
    summary: body.name,
    start: {
      dateTime: toISOFormat(body.date),
    },
    end: {
      dateTime: toISOFormat(add30Minutes(body.date)),
    },
  };

  ApiCalendar.createEvent(calendarNewEvent, "primary")
    .then(({ body: calendarBody }) => {
      const { htmlLink, id } = JSON.parse(calendarBody);

      return Axios.post(API_URL_EVENTS, {
        ...body,
        htmlLink,
        googleCalendarID: id,
      });
    })
    .then(({ data: { errors } }) => {
      if (errors) return setErrors(errors);

      window.location.assign("/events");
    })
    .catch(({ result: { error: { errors } } }) => {
      setErrors(errors)
      console.log('errors', errors)
    });
};

export const updateEvent = (body = {}, setErrors) => {

  const calendarUpdateEvent = {
    summary: body.name,
    start: {
      dateTime: toISOFormat(body.date),
    },
    end: {
      dateTime: toISOFormat(add30Minutes(body.date)),
    },
  };

  ApiCalendar.updateEvent(calendarUpdateEvent, body.googleCalendarID)
    .then(() => Axios.put(API_URL_EVENTS, body))
    .then(({ data: { errors } }) => {
      if (errors) return setErrors(errors);
      window.location.assign("/events");
    })
    .catch(console.error);
};
