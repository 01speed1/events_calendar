import React from "react";
import EventForm from "../../components/Forms/EventForm";
import { Link } from "react-router-dom";

export default function Event() {
  return (
    <div className="Event">
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Event form</h1>
            <h2 className="subtitle">Create or update your event</h2>
            <Link className="button" to="/events">Return to events list</Link>
          </div>
        </div>
      </section>

      <div className="container">
        <EventForm />
      </div>
    </div>
  );
}
