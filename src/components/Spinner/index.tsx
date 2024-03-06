import React from "react";
import "./style.css";

export default function Spinner() {
  // return <div className="spinner"></div>;
  return (
    <div className="spinner-container">
      <div className="spinner-wrapper">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
