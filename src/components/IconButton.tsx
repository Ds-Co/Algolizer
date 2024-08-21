import  {useState} from "react";
import "./IconButtonStyle.css";
import gitHubIcon from 'F:/Algolizer/GS_Visualizer/src/assets/githubIcon.png';
import videoIcon from 'F:/Algolizer/GS_Visualizer/src/assets/videoIcon.png';
import arrowIcon from 'F:/Algolizer/GS_Visualizer/src/assets/arrowIcon.png';

interface Icon{
  icon : string;
  className : string;
}
function IconButton({icon , className} : Icon){
  const [Hovered , setHovered] = useState(false);
  const HoverEnter = () => {
    setHovered(true);
  };

  const HoverLeave = () => {
    setHovered(false);
  };
  return (
    <img className = {`${className} ${Hovered ? 'hovered' : ''}`} onMouseEnter={HoverEnter} onMouseLeave={HoverLeave} src = {icon}></img>
  );

}
function IconButtons() {
  // const videoClick = () => {
  // };

  // const gitHubClick = () => {
  // };

  return (
    <div className = "icons">
      <div className = "iconsDiv">
        <div className = "videodiv">
          <button className = "video"> 
           <IconButton icon = {videoIcon} className="png"/>
          </button>
        </div>
        <div className = "gitdiv">
          <button className = "git">
            <IconButton icon = {gitHubIcon} className="png"/>
          </button>
        </div>
      </div>
      <div className = "arrowDiv">
        <button className = "arrow">
        <IconButton icon = {arrowIcon} className="arrowPng"/>
        </button>
      </div>
    </div>
  );
}
export default IconButtons;
