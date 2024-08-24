import React, { useState } from "react";
import arrow from "/assets/side_arrow.png";
import complexitybutton from "/assets/Complexity_logo.png";
import backbutton from "/assets/back_button.png";
import "./SideBar.css";

const SideBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className={`uppersidebar ${isCollapsed ? "vanish" : ""}`}>
        <a className="arraytext">Array Data:</a>
        <input
          className="arrayinput"
          type="text"
          placeholder="Enter Your Array"
        />
      </div>
      <div className={`middlesidebar ${isCollapsed ? "vanish" : ""}`}>
        <button className="sidearrowbutton" onClick={toggleSidebar}>
          <img
            id="sidearrow"
            src={arrow}
            className={isCollapsed ? "rotate-arrow" : ""}
            alt="Toggle Sidebar"
          />
        </button>
      </div>
      <div className={`lowersidebar ${isCollapsed ? "vanish" : ""}`}>
        <div className="array-size">
          <a className="array-size-text">Array Size</a>
          <input
            className="array-size-input"
            type="number"
            placeholder="Enter Size"
          />
        </div>
        <div className="duplicate">
          <a className="duplicatetext">Duplicates</a>
          <input type="checkbox" />
        </div>
        <div className="complexity">
          <h4 id="valuerange">Complexity:</h4>
          <div className="complexityfield"></div>
        </div>
        <div className="sidebarbuttons">
          <button className="back-button">
            <img className="backpng" src={backbutton} alt="Back" />
          </button>
          <button className="complexity-button">
            <img className="complexitypng" src={complexitybutton} alt="Complexity" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
