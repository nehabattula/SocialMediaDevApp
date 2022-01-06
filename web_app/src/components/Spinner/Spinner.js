import React, { Fragment } from "react";
import spinner from "../../images/spinner.gif";
import "./Spinner.scss";

//spinner for pages which take time to load
const Spinner = () => (
  <div className="spinner">
    <img
      src={spinner}
      style={{
        width: "300px",
        margin: "auto",
        display: "block",
        height: "300px",
      }}
      alt="Loading..."
    />
  </div>
);

export default Spinner;
