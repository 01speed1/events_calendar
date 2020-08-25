import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import { eventDateFormater } from "../../../helpers/date.helper";
import { API_URL_EVENT } from "../../../constants";

export default function EventItem( { id, name, category, date, htmlLink }) {

  const handleOnRemoveEvent = () => {
    Axios.delete(`${API_URL_EVENT}/${id}`).catch(console.error);
  };

  const dateFormated = eventDateFormater(date);

  return (
    <div className="EventItem">
      <div className="container">
        <div className="card">
          <div className="card-content">
            <p className="title">{name}</p>
            <p className="subtitle">{category}</p>
            <p className="subtitle">{dateFormated}</p>
          </div>
          <footer className="card-footer">
            <a className="card-footer-item" rel="noopener noreferrer" href={htmlLink} target="_blank">
              visit on Google Calendar
            </a>
            <Link href="#" className="card-footer-item" to={`/event/${id}`}>
              Update Event
            </Link>
            <button onClick={handleOnRemoveEvent} className="card-footer-item">
              <span> Remove Event</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
