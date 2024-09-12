import React, { useRef, useState } from "react";
import sortIcon from "/src/assets/sort_icon.png";
import { TopBar } from "../TopBar";
import { SideBar } from "../SideBar";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { SortingVisualization } from "./SortingVisualization";

interface SortResponse {
  sortedArray: number[];
  snapshots: any[];
}
interface ArrayGeneratorProps {
  clearInput: () => void;
}

const ArrayGenerator: React.FC<ArrayGeneratorProps> = ({ clearInput }) => {
  const [arraySize, setArraySize] = useState<number>(0);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);

  const handleArraySizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const size = parseInt(event.target.value, 10); // decimal system 10
    setArraySize(size);
    generateArray(size, allowDuplicates);
    clearInput();
  };

  const handleDuplicateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setAllowDuplicates(isChecked);
    generateArray(arraySize, isChecked);
  };

  const generateArray = (size: number, allowDuplicates: boolean) => {
    let array: number[] = [];

    if (allowDuplicates) {
      const range = Math.max(10, Math.floor(size / 2));
      for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * range + 1));
      }
    } else {
      const availableNumbers = Array.from({ length: 100 }, (_, i) => i + 1);
      for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        array.push(availableNumbers.splice(randomIndex, 1)[0]);
      }
    }

    localStorage.setItem("arrayInput", JSON.stringify(array));
    console.log("Generated Array:", array);
  };

  return (
    <>
      <div className="sidebar__array-size">
        <h4 className="sidebar__array-size-text">Array Size:</h4>
        <input
          className="sidebar__array-size-input"
          type="number"
          placeholder="Enter Size"
          value={arraySize}
          onChange={handleArraySizeChange}
          min="1"
        />
      </div>
      <div className="sidebar__duplicate">
        <a className="sidebar__duplicate-text">Duplicates</a>
        <input
          className="sidebar__duplicate-checkbox"
          type="checkbox"
          checked={allowDuplicates}
          onChange={handleDuplicateChange}
        />
      </div>
    </>
  );
};

export { ArrayGenerator };

const SortingScreen = () => {
  const [selectedSortType, setSelectedSortType] =
    useState<string>("Bubble Sort");
  const [inputValue, setInputValue] = useState<string>("");
  const sortingRef = useRef<{
    startSorting: () => void;
    stopSorting: () => void;
    pauseVisualization: () => void;
    resumeVisualization: () => void;
    setSpeed: (newSpeed: "default" | "quick") => void;
    isSorting: boolean;
    isPaused: boolean;
  } | null>(null);

  const sorts: string[] = [
    "Bubble Sort",
    "Bogo Sort",
    "Quick Sort",
    "Insertion Sort",
    "Selection Sort",
    "Merge Sort",
    "Heap Sort",
  ];
  const [currentSpeed, setCurrentSpeed] = useState<"default" | "quick">(
    "default"
  );
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
      .map((line) =>
        line.split(",").map((item) => {
          const trimmedItem = item.trim();
          // Regular expression to check for valid positive integers
          return /^[1-9]\d*$/.test(trimmedItem) ? parseInt(trimmedItem, 10) : null;
        })
      )
      .flat()
      .filter((item) => item !== null);

    console.log("i am here", array);
    localStorage.setItem("arrayInput", JSON.stringify(array));
    setInputValue(value);
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

  const handleResetClick = async () => {
    sortingRef.current?.stopSorting();
  };

  const handleSpeedUpClick = async () => {
    const newSpeed = currentSpeed === "default" ? "quick" : "default";
    setCurrentSpeed(newSpeed);
    if (sortingRef.current) {
      sortingRef.current.setSpeed(newSpeed);
    }
  };

  const clearInputValue = () => {
    setInputValue("");
  };

  return (
    <div>
      <TopBar
        dropdownmenu={sorts}
        sortingsProps={sortingsProps}
        onSelectChange={handleSelectChange}
        handleVisualizeClick={handleVisualizeClick}
        handlePauseClick={handleVisualizePause}
        handleResetClick={handleResetClick}
        handleSpeedUpClick={handleSpeedUpClick}
      />
      <SideBar
        ArrayGenerator={(props) => (
          <ArrayGenerator {...props} clearInput={clearInputValue} />
        )}
        selectedSortType={selectedSortType}
        getComplexity={getComplexity}
        handleInputChange={handleInputChange}
      // inputValue={inputValue}
      />
      <SortingVisualization width={400} height={300} ref={sortingRef} />
    </div>
  );
};

export { SortingScreen };
