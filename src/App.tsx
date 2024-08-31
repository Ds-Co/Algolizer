import React, { useState } from "react";
import sortIcon from "/assets/sort_icon.png";
import { TopBar } from "./Components/SortingScreen/TopBar";
import { SideBar } from "./Components/SortingScreen/SideBar";
import "bootstrap/dist/css/bootstrap.css";

const ArrayGenerator: React.FC = () => (
  <>
    <div className="sidebar__array-size">
      <h4 className="sidebar__array-size-text">Array Size:</h4>
      <input
        className="sidebar__array-size-input"
        type="number"
        placeholder="Enter Size"
      />
    </div>
    <div className="sidebar__duplicate">
      <a className="sidebar__duplicate-text">Duplicates</a>
      <input className="sidebar__duplicate-checkbox" type="checkbox" />
    </div>
  </>
);

const App = () => {
  const [selectedSortType, setSelectedSortType] = useState<string>("Bubble Sort");

  const sorts: string[] = [
    "Bubble Sort",
    "Bogo Sort",
    "Quick Sort",
    "Insertion Sort",
    "Selection Sort",
    "Sleep Sort",
    "Merge Sort",
    "Heap Sort",
  ];

  const sortingsProps = {
    text: "Sorting",
    icon: sortIcon,
  };

  const handleSelectChange = (sortType: string) => {
    setSelectedSortType(sortType);
  };

  return (
    <div>
      <TopBar 
        dropdownmenu={sorts} 
        sortingsProps={sortingsProps} 
        onSelectChange={handleSelectChange} // Pass handler to TopBar
      />
      <SideBar 
        ArrayGenerator={ArrayGenerator} 
        selectedSortType={selectedSortType} // Pass selected sort type to SideBar
      />
    </div>
  );
};

export { App };
