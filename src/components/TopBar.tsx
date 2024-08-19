import React, { ReactNode, useState } from "react";
import "./TopBar.css";
import sortIcon from "/assets/sort_icon.png";
import info from "/assets/info.png";
import reset from "/assets/reset.png";
import speedUp from "/assets/speed_up.png";
import visualize from "/assets/visualize.png";
import pause from "/assets/pause.png";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "./DropDown";
interface g_icons {
  iconimg: ReactNode;
  icontxt: string;
}
const TopBar = () => {
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

  const icons: g_icons[] = [
    { iconimg: <img className="png" src={info} />, icontxt: "Info" },
    { iconimg: <img className="png" src={reset} />, icontxt: "Reset" },
    { iconimg: <img className="png" src={pause} />, icontxt: "Pause" },
    { iconimg: <img className="png" src={speedUp} />, icontxt: "SpeedUp" },
    { iconimg: <img className="png" src={visualize} />, icontxt: "Visualize" },
  ];

  return (
    <div className="topbar">
      <div className="sortings">
        <div className="pngdiv">
        <img src={sortIcon} className="sortpng" />
        </div>
        
        <a className="sorttext">Sorting</a>
      </div>
        <Dropdown sorts={sorts} />
        {icons.map((icon) => (
          <div className="icons">
            <button className="iconbutton">{icon.iconimg}</button>
            <a className="icontext">{icon.icontxt}</a>
          </div>
        ))}
    </div>
  );
};
export default TopBar;