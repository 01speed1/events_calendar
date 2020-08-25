import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../Home";
import Events from "../Events";
import Event from "../Event";
import MainNavbar from "../../components/Navbars/MainNavbar";

export default function App() {

  return (
    <div className="App">
      <MainNavbar />
      <Router>
        <Route path="/home/" component={Home} />
        <Route path="/events" component={Events} />
        <Route path="/event/:eventID" component={Event} />
        <Route path="/" exact component={Home} />
      </Router>
    </div>
  );
}
