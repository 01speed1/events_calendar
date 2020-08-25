import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="hero is-medium is-light is-bold is-large">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Welcome to Events Calendar</h1>
            <h2 className="subtitle">
              Here you will can create your future events
            </h2>
            <Link to="/events">
              <button className="button is-large is-dark">
                <span className="icon">
                  <i className="fas fa-calendar-alt"></i>
                </span>
                <span>See the list of my events</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}