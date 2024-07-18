import React from "react";
import "./infobox.css";

function InfoBox({ heading, information, icon }) {
  return (
    <div className="info-box">
      <h4 className="info-heading">{heading}</h4>
      {icon ? React.cloneElement(icon, { className: "icon" }) : null}
      <p className="info">{information}</p>
    </div>
  );
}

export default InfoBox;
