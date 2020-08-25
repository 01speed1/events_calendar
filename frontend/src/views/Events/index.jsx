import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import { API_URL_EVENTS } from "../../constants";
import EventItem from "../../components/Items/EventItem";

export default function Events() {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    Axios.get(API_URL_EVENTS)
      .then(({ data: { events } }) => setMyEvents(events))
      .catch(console.error);

    return () => {};
  }, [myEvents]);

  return (
    <div className="Events">
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">My events list</h1>
            <h2 className="subtitle">Here you can see and create your events</h2>
            <Link className="button" to="/event/new">
              <span className="icon">
                <i className="fas fa-calendar-plus"></i>
              </span>
              <span>Create Event</span>
            </Link>
          </div>
        </div>
      </section>

      {myEvents.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </div>
  );
}
