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

const IconButton = ({ iconimg, icontxt }: { iconimg: string; icontxt: string }) => (
  <div className="topbar__icons">
    <button className="topbar__iconbutton">
      <img className="topbar__png" src={iconimg} />
    </button>
    <a className="topbar__icontext">{icontxt}</a>
  </div>
);

const IconList = () => {
  const icons = [
    { iconimg: info, icontxt: "Info" },
    { iconimg: reset, icontxt: "Reset" },
    { iconimg: pause, icontxt: "Pause" },
    { iconimg: speedUp, icontxt: "SpeedUp" },
    { iconimg: visualize, icontxt: "Visualize" },
  ];

  return (
    <>
      {icons.map(({ iconimg, icontxt }) => (
        <IconButton key={icontxt} iconimg={iconimg} icontxt={icontxt} />
      ))}
    </>
  );
};

const TopBar = ({ dropdownmenu, sortingsProps }: TopBarProps) => {
  return (
    <div className="topbar">
      <Sortings text={sortingsProps.text} icon={sortingsProps.icon} />
      <DropDown sorts={dropdownmenu} />
      <IconList />
    </div>
  );
};

export { TopBar };
