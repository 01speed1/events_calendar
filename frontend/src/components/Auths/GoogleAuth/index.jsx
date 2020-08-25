import React, { useState } from "react";
import ApiCalendar from "react-google-calendar-api";

export default function GoogleAuth() {
  const [sign, setSign] = useState(false);

  const handleOnAuth = () => {
    ApiCalendar.handleAuthClick();
    setSign(true);
  };

  const handleLogout = () => {
    ApiCalendar.handleSignoutClick();
    setSign(false);
    window.location.assign("/");
  };

  return (
    <div className="GoogleAuth">
      {sign ? (
        <p className="control">
          <button onClick={handleLogout} className="button is-danger">
            <span className="icon">
              <i className="fas fa-door-open"></i>
            </span>
            <span>Logout Google account</span>
          </button>
        </p>
      ) : (
        <p className="control">
          <button onClick={handleOnAuth} className="button is-info">
            <span className="icon">
            <i className="fab fa-google"></i>
            </span>
            <span>Authenticate With Google</span>
          </button>
        </p>
      )}
    </div>
  );
}
