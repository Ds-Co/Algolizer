import React, { useState } from "react";
import arrow from "/src/assets/side_arrow.png";
import complexitybutton from "/src/assets/Complexity_logo.png";
import backbutton from "/src/assets/back_button.png";
import "/src/css/SideBar.css";
import { Link } from "react-router-dom";

interface LowerSidebarProps {
  ArrayGenerator: React.FC;
  selectedSortType: string;
  getComplexity: (sortType: string) => string;
}

interface SideBarProps {
  ArrayGenerator: React.FC;
  selectedSortType: string;
  getComplexity: (sortType: string) => string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // inputValue: string;
}

interface UpperSidebarProps {
  // inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const UpperSidebar: React.FC<UpperSidebarProps> = ({
  //  inputValue,
  handleInputChange
}) => {
  return (
    <div className="sidebar__upper">
      <h4 className="sidebar__array-text">Array Data:</h4>
      <textarea
        className="sidebar__array-input"
        placeholder="Enter Your Array"
        //value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};


const MiddleSidebar: React.FC<{
  isCollapsed: boolean;
  toggleSidebar: () => void;
}> = ({ isCollapsed, toggleSidebar }) => (
  <div className="sidebar__middle">
    <button className="sidebar__toggle-button" onClick={toggleSidebar}>
      <img
        className={`sidebar__arrow ${isCollapsed ? "sidebar__arrow--rotated" : ""
          }`}
        src={arrow}
        alt="Toggle Sidebar"
      />
    </button>
  </div>
);

const LowerSidebar: React.FC<LowerSidebarProps> = ({
  ArrayGenerator,
  selectedSortType,
  getComplexity,
}) => {
  return (
    <div className="sidebar__lower">
      <ArrayGenerator />
      <div className="sidebar__complexity">
        <h4 className="sidebar__complexity-text">Complexity:</h4>
        <div className="sidebar__complexity-field">
          {getComplexity(selectedSortType)}
        </div>
      </div>
      <div className="sidebar__buttons">
        <Link to="/SplitScreen">
          <button className="sidebar__back-button">
            <img className="sidebar__back-icon" src={backbutton} alt="Back" />
          </button>
        </Link>
        <button className="sidebar__complexity-button">
          <img
            className="sidebar__complexity-icon"
            src={complexitybutton}
            alt="Complexity"
          />
        </button>
      </div>
    </div>
  );
};

export const SideBar: React.FC<SideBarProps> = ({
  ArrayGenerator,
  selectedSortType,
  getComplexity,
  handleInputChange,
  // inputValue
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "sidebar--collapsed" : ""}`}>
      {!isCollapsed && (
        <UpperSidebar
          //   inputValue={inputValue}
          handleInputChange={handleInputChange}
        />
      )}
      <MiddleSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      {!isCollapsed && (
        <LowerSidebar
          ArrayGenerator={ArrayGenerator}
          selectedSortType={selectedSortType}
          getComplexity={getComplexity}
        />
      )}
    </div>
  );
};
