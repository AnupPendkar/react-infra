import React from "react";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner-container">
        <div className="spinner mb-17"></div>
        <span className="fsr-22 font-ib white loading-text">Loading</span>
      </div>
    </div>
  );
};

export default Loader;
