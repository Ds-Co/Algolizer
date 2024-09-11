import React, { useState, useRef } from "react";
import sortIcon from "/src/assets/sort_icon.png";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";
import { SortingVisualization } from "./SortingVisualization";

interface SortResponse {
  sortedArray: number[];
  snapshots: any[];
}

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
  const sortingRef = useRef<{
    startSorting: () => void;
    isSorting: Boolean;
    pauseVisualization: () => void;
    resumeVisualization: () => void;
    isPaused: Boolean;
  }>(null);

  const [selectedSortType, setSelectedSortType] =
    useState<string>("Bubble Sort");
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
      .map((line) => line.split(",").map((item) => parseInt(item.trim(), 10)))
      .flat()
      .filter((item) => !isNaN(item));

    localStorage.setItem("arrayInput", JSON.stringify(array)); // Store the array in localStorage
    console.log(array);
  };

  const sortingsProps = {
    text: "Sorting",
    icon: sortIcon,
  };

  const handleSelectChange = (sortType: string) => {
    setSelectedSortType(sortType);
  };

  const handleVisualizeClick = async () => {
    if (!sortingRef.current?.isSorting) {
      const storedArray = localStorage.getItem("arrayInput");
      const array = storedArray ? JSON.parse(storedArray) : [];

      console.log("selectedSortType:", selectedSortType);
      console.log("Array to be Sorted:", array);

      try {
        const response = await axios.post<SortResponse>(
          "http://localhost:5000/api/sort",
          {
            array: array,
            sortType: selectedSortType,
          }
        );
        console.log("Sorted Array:", response.data.sortedArray);
        console.log("Snapshots:", response.data.snapshots);
        localStorage.setItem(
          "SortedArray",
          JSON.stringify(response.data.sortedArray)
        ); // Store the array in localStorage
        localStorage.setItem(
          "Snapshots",
          JSON.stringify(response.data.snapshots)
        );
        sortingRef.current?.startSorting();
      } catch (error) {
        console.error("Error during sorting:", error);
      }
    }
  };

  const handleVisualizePause = async () => {
    console.log(!sortingRef.current?.isPaused);
    if (!sortingRef.current?.isPaused) {
      sortingRef.current?.pauseVisualization();
    } else {
      sortingRef.current.resumeVisualization();
    }
  };

  return (
    <div>
      <TopBar
        dropdownmenu={sorts}
        sortingsProps={sortingsProps}
        onSelectChange={handleSelectChange}
        handleVisualizeClick={handleVisualizeClick}
        handleVisualizePause={handleVisualizePause}
      />
      <SideBar
        ArrayGenerator={ArrayGenerator}
        selectedSortType={selectedSortType}
        getComplexity={getComplexity} // Pass selected sort type to SideBar
        handleInputChange={handleInputChange} // Pass handleInputChange to SideBar
      />
      <SortingVisualization width={400} height={500} ref={sortingRef} />
    </div>
  );
};

export { SortingScreen };