import React, { useState } from "react";
import "/src/css/TopBar.css";
import info from "/src/assets/info.png";
import reset from "/src/assets/reset.png";
import speedUp from "/src/assets/speed_up.png";
import visualize from "/src/assets/visualize.png";
import pause from "/src/assets/pause.png";
import resume from "/src/assets/resume.png";
import "bootstrap/dist/css/bootstrap.css";
import { DropDown } from "./DropDown";
import InfoModal from "./InfoModal";
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
  isPaused: boolean;
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
      <img className="topbar__png" id= {iconimg === "pause" || iconimg === "Resume" ? "topbar__png__pause-resume":""}src={iconimg} />
    </button>
    <a className="topbar__icontext">{icontxt}</a>
  </div>
);

const IconList = ({
  onInfoClick,
  onVisualizeClick,
  onResetClick,
  onPauseClick,
  onSpeedUpClick,
  isPaused,
}: {
  onInfoClick: () => void;
  onVisualizeClick: () => void;
  onResetClick: () => void;
  onPauseClick: () => void;
  onSpeedUpClick: () => void;
  isPaused: boolean;
}) => {
  const icons = [
    { iconimg: info, icontxt: "Info", onClick: onInfoClick },
    { iconimg: reset, icontxt: "Reset", onClick: onResetClick },
    { iconimg: isPaused? resume : pause, icontxt: isPaused? "Resume":"Pause", onClick: onPauseClick },
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
  isPaused,
}) => {
  const [selectedSortType, setSelectedSortType] = useState<string>(
    dropdownmenu[0]
  );
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const handleSelectChange = (sortType: string) => {
    setSelectedSortType(sortType);
    onSelectChange(sortType);
  };
  const handleInfoClick = () => {
    setShowInfo(true);
  };

  const closeModal = () => {
    setShowInfo(false);
  };

  return (
    <div className="topbar">
      <Sortings text={sortingsProps.text} icon={sortingsProps.icon} />
      <DropDown sorts={dropdownmenu} onSelectChange={handleSelectChange} isAnimating={isAnimating} />
      <IconList
        onInfoClick={handleInfoClick}
        onVisualizeClick={handleVisualizeClick}
        onResetClick={handleResetClick}
        onPauseClick={handlePauseClick}
        onSpeedUpClick={handleSpeedUpClick}
        isPaused={isPaused}
      />
      <InfoModal
        show={showInfo}
        onClose={closeModal}
        selectedAlgorithm={selectedSortType}
      />
    </div>
  );
};

export { TopBar };
