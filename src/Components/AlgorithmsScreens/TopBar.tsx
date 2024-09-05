import React, { useState } from "react";
import "/src/css/TopBar.css";
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
  onSelectChange: (sortType: string) => void;
  handleVisualizeClick: () => void; // New prop for the visualization logic
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

const IconButton = ({
  iconimg,
  icontxt,
  onClick,
}: {
  iconimg: string;
  icontxt: string;
  onClick?: () => void;
}) => (
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
        <IconButton
          key={icontxt}
          iconimg={iconimg}
          icontxt={icontxt}
          onClick={onClick}
        />
      ))}
    </>
  );
};

const TopBar: React.FC<TopBarProps> = ({
  dropdownmenu,
  sortingsProps,
  onSelectChange,
  handleVisualizeClick, // Receive the new prop
}) => {
  const [selectedSortType, setSelectedSortType] = useState<string>(
    dropdownmenu[0]
  );

  const handleSelectChange = (sortType: string) => {
    setSelectedSortType(selectedSortType);
    onSelectChange(sortType); // Notify parent of the selected sort type
  };

  return (
    <div className="topbar">
      <Sortings text={sortingsProps.text} icon={sortingsProps.icon} />
      <DropDown sorts={dropdownmenu} onSelectChange={handleSelectChange} />
      <IconList onVisualizeClick={handleVisualizeClick} /> {/* Pass the prop */}
    </div>
  );
};

export { TopBar };
