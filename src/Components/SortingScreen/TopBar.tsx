import React, { useState } from "react";
import "/src/css/TopBar.css";
import axios from "axios";
import info from "/assets/info.png";
import reset from "/assets/reset.png";
import speedUp from "/assets/speed_up.png";
import visualize from "/assets/visualize.png";
import pause from "/assets/pause.png";
import "bootstrap/dist/css/bootstrap.css";
import { DropDown } from "./DropDown";

interface SortingsProps {
  text: string;
  icon: string;
}

interface TopBarProps {
  dropdownmenu: string[];
  sortingsProps: SortingsProps;
}

const Sortings = ({ text, icon }: SortingsProps) => {
  return (
    <div className="topbar__sortings">
      <div className="topbar__pngdiv">
        <img src={icon} className="topbar__sortpng" />
      </div>
      <a className="topbar__sorttext">{text}</a>
    </div>
  );
};

const IconButton = ({ iconimg, icontxt, onClick }: { iconimg: string; icontxt: string; onClick?: () => void }) => (
  <div className="topbar__icons">
    <button className="topbar__iconbutton" onClick={onClick}>
      <img className="topbar__png" src={iconimg} />
    </button>
    <a className="topbar__icontext">{icontxt}</a>
  </div>
);

const IconList = ({ onVisualizeClick }: { onVisualizeClick: () => void }) => {
  const icons = [
    { iconimg: info, icontxt: "Info" },
    { iconimg: reset, icontxt: "Reset" },
    { iconimg: pause, icontxt: "Pause" },
    { iconimg: speedUp, icontxt: "SpeedUp" },
    { iconimg: visualize, icontxt: "Visualize", onClick: onVisualizeClick },
  ];
  return (
    <>
      {icons.map(({ iconimg, icontxt, onClick }) => (
        <IconButton key={icontxt} iconimg={iconimg} icontxt={icontxt} onClick={onClick} />
      ))}
    </>
  );
};

const TopBar = ({ dropdownmenu, sortingsProps }: TopBarProps) => {
  const [selectedSortType, setSelectedSortType] = useState<string>(dropdownmenu[0]); // Initialize with the first option or a default value

  const handleSelectChange = (sortType: string) => {
    setSelectedSortType(sortType); // Update the selected sort type
  };

  const handleVisualizeClick = async () => {
    const storedArray = localStorage.getItem("arrayInput");
    const array = storedArray ? JSON.parse(storedArray) : []; // Retrieve and parse the array from localStorage

    console.log("Selected Sort Type:", selectedSortType);
    console.log("Array to be sorted:", array);

    try {
      const response = await axios.post("http://localhost:5000/api/sort", {
        array: array, // Use the retrieved array
        sortType: selectedSortType, // Use the selected sort type
      });
      console.log(response.data.sortedArray); // Log the sorted array
    } catch (error) {
      console.error("Error during sorting:", error);
    }
  };

  return (
    <div className="topbar">
      <Sortings text={sortingsProps.text} icon={sortingsProps.icon} />
      <DropDown sorts={dropdownmenu} onSelectChange={handleSelectChange} />
      <IconList onVisualizeClick={handleVisualizeClick} />
    </div>
  );
};

export { TopBar };
