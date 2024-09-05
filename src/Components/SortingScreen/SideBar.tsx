import React, { useState } from "react";
import arrow from "/assets/side_arrow.png";
import complexitybutton from "/assets/Complexity_logo.png";
import backbutton from "/assets/back_button.png";
import "/src/css/SideBar.css";
import { Link } from "react-router-dom";

const UpperSidebar: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Is there better?
    const array = value
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((item) => !isNaN(item));
    localStorage.setItem("arrayInput", JSON.stringify(array)); // Store the array in localStorage
  };

  return (
    <div className="sidebar__upper">
      <h4 className="sidebar__array-text">Array Data:</h4>
      <input
        className="sidebar__array-input"
        type="text"
        placeholder="Enter Your Array"
        value={inputValue}
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
        className={`sidebar__arrow ${
          isCollapsed ? "sidebar__arrow--rotated" : ""
        }`}
        src={arrow}
        alt="Toggle Sidebar"
      />
    </button>
  </div>
);

const LowerSidebar: React.FC<{
  ArrayGenerator: React.FC;
  selectedSortType: string;
}> = ({ ArrayGenerator, selectedSortType }) => {
  const getComplexity = (sortType: string): string => {
    switch (sortType) {
      case "Bubble Sort":
        return "O(n^2)";
      case "Quick Sort":
        return "O(n^2)";
      case "Merge Sort":
        return "O(n log n)";
      case "Insertion Sort":
        return "O(n^2)";
      case "Selection Sort":
        return "O(n^2)";
      case "Bogo Sort":
        return "O((n!)^2)";
      case "Sleep Sort":
        return "Not well-defined";
      case "Heap Sort":
        return "O(n log n)";
      default:
        return "Unknown Complexity";
    }
  };

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

const SideBar: React.FC<{
  ArrayGenerator: React.FC;
  selectedSortType: string;
}> = ({ ArrayGenerator, selectedSortType }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "sidebar--collapsed" : ""}`}>
      {!isCollapsed && <UpperSidebar />}
      <MiddleSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      {!isCollapsed && (
        <LowerSidebar
          ArrayGenerator={ArrayGenerator}
          selectedSortType={selectedSortType}
        />
      )}
    </div>
  );
};

export { SideBar };
