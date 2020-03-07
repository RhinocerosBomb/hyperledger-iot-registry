import React, { useState } from "react";
import "./App.css";
import App from "./App";

function Popup({children, show}) {
    if(!show) return null;

  return (
    <div className="popup">
      <div className="popup\_inner">
        {children}
      </div>
    </div>
  );
}

export default Popup;
