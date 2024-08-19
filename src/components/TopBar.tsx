import React, { ReactNode, useState } from "react";
import "./TopBar.css";
import sortIcon from "/assets/sort_icon.png";
import info from "/assets/info.png";
import reset from "/assets/reset.png";
import speedUp from "/assets/speed_up.png";
import visualize from "/assets/visualize.png";
import pause from "/assets/pause.png";
import "bootstrap/dist/css/bootstrap.css";

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
    { iconimg: <img className="png" src ={info} />, icontxt: "Info" },
    { iconimg: <img className="png" src={reset} />, icontxt: "Reset" },
    { iconimg: <img className="png" src={pause} />, icontxt: "Pause" },
    { iconimg: <img className="png" src={speedUp} />, icontxt: "SpeedUp" },
    { iconimg: <img className="png" src={visualize} />, icontxt: "Visualize" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="nav nav-tabs">
        <div className="sortings">
        <img src={sortIcon} className="sortpng" />
        <a className="sorty">Sorting</a>
        </div>
      
        <div className="dropdown-group">
          <button
            onClick={handleToggle}
            className="dropy btn-secondary dropdown-toggle"
            id="easy"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sorting Algorithms
          </button>
          {isOpen && (
            <div>
            <ul className="dropdown-menu">
              {sorts.map((sort, index) => (
                <li
                  key={sort}
                  className="dropdown-item"
                  onClick={() => handleItemClick()}
                >
                  {sort}
                </li>
              ))}
            </ul>
            </div>
          )}
        </div>
        {icons.map((icon) => (
          <div className="icons">
            <button className="infobutton">{icon.iconimg}</button>
            <a className="icontexts">{icon.icontxt}</a>
          </div>
        ))}
        </div>
    </>
  );
};
export default TopBar;
