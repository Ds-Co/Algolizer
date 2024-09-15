import React, { useState } from "react";
import "/src/css/TopBar.css";
import info from "/src/assets/info.png";
import reset from "/src/assets/reset.png";
import speedUp from "/src/assets/speed_up.png";
import visualize from "/src/assets/visualize.png";
import pause from "/src/assets/pause.png";
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
  handleVisualizeClick: () => void;
  handleResetClick: () => void;
  handlePauseClick: () => void;
  handleSpeedUpClick: () => void;
  isAnimating: boolean;
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

const IconList = ({
  onVisualizeClick,
  onResetClick,
  onPauseClick,
  onSpeedUpClick,
}: {
  onVisualizeClick: () => void;
  onResetClick: () => void;
  onPauseClick: () => void;
  onSpeedUpClick: () => void;
}) => {
  const icons = [
    { iconimg: info, icontxt: "Info" },
    { iconimg: reset, icontxt: "Reset", onClick: onResetClick },
    { iconimg: pause, icontxt: "Pause", onClick: onPauseClick },
    { iconimg: speedUp, icontxt: "SpeedUp", onClick: onSpeedUpClick },
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
  handleVisualizeClick,
  handlePauseClick,
  handleResetClick,
  handleSpeedUpClick,
  isAnimating,
}) => {
  const [selectedSortType, setSelectedSortType] = useState<string>(
    dropdownmenu[0]
  );

  const handleSelectChange = (sortType: string) => {
    setSelectedSortType(sortType); // Correct the assignment
    onSelectChange(sortType);
  };

  // Define specific handlers for each button

  return (
    <div className="topbar">
      <Sortings text={sortingsProps.text} icon={sortingsProps.icon} />
      <DropDown sorts={dropdownmenu} onSelectChange={handleSelectChange} isAnimating={isAnimating} />
      <IconList
        onVisualizeClick={handleVisualizeClick}
        onResetClick={handleResetClick}
        onPauseClick={handlePauseClick}
        onSpeedUpClick={handleSpeedUpClick}
      />
    </div>
  );
};

export { TopBar };
