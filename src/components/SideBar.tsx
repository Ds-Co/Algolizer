import React from "react";
import arrow from "/assets/side_arrow.png";
import complexitybutton from "/assets/Complexity_logo.png";
import backbutton from "/assets/back_button.png";
import "./SideBar.css";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="uppersidebar">
        <a className="arraytext">Array Data:</a>
        <input
          className="arrayinput"
          type="text"
          placeholder="Enter Your Array"
        ></input>
      </div>
      <div className="middlesidebar">
        <button className="sidearrowbutton">
          <img id="sidearrow" src={arrow}></img>
        </button>
      </div>
      <div className="lowersidebar">
        <div className="duplicate">
          <input type="checkbox"></input>
          <a className="duplicatetext">Duplicates</a>
        </div>
        <div>
          <h4 id="valuerange">Value Range:</h4>
          <div className="slider-container">
            <div className="slider-bar"></div>
            <div className="slider-handle min-handle"></div>
            <div className="slider-handle max-handle"></div>
          </div>
        </div>
        <div className="complexity">
          <h4 id="valuerange">Complexity:</h4>
          <div className="complexityfield"></div>
        </div>
        <div className="sidebarbuttons">
          <button className="complexity-button">
            <img className="complexitypng" src={complexitybutton}></img>
          </button>
          <button className="back-button">
            <img className="backpng" src={backbutton}></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
