import React, { useRef, useState } from "react";
import sortIcon from "/assets/sort_icon.png";
import { TopBar } from "../TopBar";
import { SideBar } from "../SideBar";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { SortingVisualization } from "../SortingVisualization";

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

const SortingScreen = () => {
  const [selectedSortType, setSelectedSortType] = useState<string>("Bubble Sort");
  const chartRef = useRef<{ renderChart: () => void } | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
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

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    const array = value
      .split("\n")
      .map(line => line.split(",").map(item => parseInt(item.trim(), 10)))
      .flat()
      .filter(item => !isNaN(item));

      localStorage.setItem("arrayInput", JSON.stringify(array)); // Store the array in localStorage
  };

  const sortingsProps = {
    text: "Sorting",
    icon: sortIcon,
  };

  const handleSelectChange = (sortType: string) => {
    setSelectedSortType(sortType);
  };

  const handleVisualizeClick = async () => {

    const storedArray = localStorage.getItem("arrayInput");
    const array = storedArray ? JSON.parse(storedArray) : [];

    console.log("selectedSortType:", selectedSortType);
    console.log("Array to be Sorted:", array);

    try {
        const response = await axios.post("http://localhost:5000/api/sort", {
        array: array,
        sortType: selectedSortType,
      });
      // console.log("Sorted Array:", response.data.sortedArray);
      // console.log("Snapshots:", response.data.snapshots);
    } catch (error) {
      console.error("Error during sorting:", error);
    }

    setIsEnabled(true);
    if (chartRef.current) {
      chartRef.current.renderChart();
    }
  };

  return (
    <div>
      <TopBar
        dropdownmenu={sorts}
        sortingsProps={sortingsProps}
        onSelectChange={handleSelectChange} // Pass handler to TopBar
        handleVisualizeClick={handleVisualizeClick} // Pass visualize logic as a prop
      />
      <SideBar
        ArrayGenerator={ArrayGenerator}
        selectedSortType={selectedSortType}
        getComplexity={getComplexity} // Pass selected sort type to SideBar
        handleInputChange={handleInputChange} // Pass handleInputChange to SideBar
      />
      <SortingVisualization ref={chartRef} isEnabled={isEnabled} />
    </div>
  );
};

export { SortingScreen };
