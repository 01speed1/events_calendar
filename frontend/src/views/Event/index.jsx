import React from "react";
import EventForm from "../../components/Forms/EventForm";
import { Link } from "react-router-dom";

export default function Event() {
  return (
    <div className="Event">
      <section class="hero is-medium is-primary is-bold">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Event form</h1>
            <h2 class="subtitle">Create or update your event</h2>
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
