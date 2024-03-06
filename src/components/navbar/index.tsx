"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-dark bg-dark mb-2">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          USER PORTAL
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={`offcanvas offcanvas-end text-bg-dark ${
            menuOpen ? "show" : ""
          }`}
          tabIndex={-1}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              User Portal
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={toggleMenu}
            />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link active" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" href="/Summary">
                  Summary
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
