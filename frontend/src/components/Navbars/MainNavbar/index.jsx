import React from "react";
import GoogleAuth from "../../Auths/GoogleAuth";

export default function MainNavbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <GoogleAuth />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
