import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { fullDateBuilder } from "../../../helpers/date.helper";

import {
  loadCategories,
  setFoundEventData,
  createEvent,
  updateEvent,
  isANewEvent,
} from "./EventForm.utils";
import BaseInput from "../../Inputs/BaseInput";
import DateInput from "../../Inputs/DateInput";
import BaseSelect from "../../Selects/BaseSelect";

export default function EventForm() {
  const [errors, setErrors] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [categoryID, setcategoryID] = useState("");
  const [categories, setCategories] = useState([]);
  const [googleCalendarID, setGoogleCalendarID] = useState("");
  const [htmlLink, setHtmlLink] = useState("");
  const { eventID } = useParams();

  const isEditing = isANewEvent(eventID);

  useEffect(() => {
    isEditing &&
      setFoundEventData({
        eventID,
        setName,
        setDate,
        setTime,
        setcategoryID,
        setGoogleCalendarID,
        setHtmlLink,
      });
  }, [eventID, isEditing]);

  useEffect(() => {
    loadCategories({ setCategories });
  }, []);

  const handleOnManageEvent = () => {
    const selectedFullDate = fullDateBuilder(date, time);
    const body = {
      id: eventID,
      name,
      date: selectedFullDate,
      categoryID,
      googleCalendarID,
      htmlLink,
    };

    const action = isEditing ? updateEvent : createEvent;

    action(body, setErrors);
  };

  return (
    <div className="EventForm">
      <div className="EventForm__errors">
        {errors && JSON.stringify(errors, 2, null)}
      </div>

      <div className="EventForm__field">
        <BaseInput
          id="newEventName"
          label="Event Description"
          type="text"
          value={name}
          setValue={setName}
          error={errors?.name}
        />
      </div>

      <div className="EventForm__field">
        <DateInput
          dateValue={date}
          timeValue={time}
          setDateValue={setDate}
          setTimeValue={setTime}
          dateErrors={errors?.date}
        />
      </div>

      <div className="EventForm__field">
        <BaseSelect
          id="newEventCategoryID"
          label="Select a category"
          value={categoryID}
          setValue={setcategoryID}
        >
          {categories.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </BaseSelect>
      </div>

      <div className="EventForm__buttons">
        <button onClick={handleOnManageEvent} className="button is-primary is-medium">
          {isEditing ? "Update" : "Create"} Event
        </button>
      </div>
    </div>
  );
}
