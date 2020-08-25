import React from "react";
import BaseInput from "../BaseInput";

export default function DateInput({
  dateValue,
  setDateValue,
  dateErrors,
  timeValue,
  setTimeValue,
}) {
  return (
    <div className="DateInput columns">
      <div className="column">
        <BaseInput
          id="newEventDate"
          label="Event day"
          type="date"
          value={dateValue}
          setValue={setDateValue}
          error={dateErrors}
        />
      </div>
      <div className="column">
        <BaseInput
          id="newEventTime"
          label="Set event start hour"
          type="time"
          value={timeValue}
          setValue={setTimeValue}
        />
      </div>
    </div>
  );
}
