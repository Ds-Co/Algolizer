import React, { useRef, useState } from "react";
import sortIcon from "/assets/sort_icon.png";
import { TopBar } from "./Components/SortingScreen/TopBar";
import { SideBar } from "./Components/SortingScreen/SideBar";
import { SortingVisualization } from "./Components/SortingScreen/SortingVisualization";
import "bootstrap/dist/css/bootstrap.css";

// Component to generate array inputs
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
  const [selectedSortType, setSelectedSortType] =
    useState<string>("Bubble Sort");
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const chartRef = useRef<{ renderChart: () => void } | null>(null);

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

  // Function to enable the visualization and trigger chart rendering
  const enableVisualizer = () => {
    setIsEnabled(true);
    if (chartRef.current) {
      chartRef.current.renderChart();
    }
  };

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
        onSelectChange={handleSelectChange}
        enableVisualizer={enableVisualizer} // Pass handler to TopBar
      />
      <SideBar
        ArrayGenerator={ArrayGenerator}
        selectedSortType={selectedSortType}
      />
      <SortingVisualization ref={chartRef} isEnabled={isEnabled} />
    </div>
  );
};

export { App };
