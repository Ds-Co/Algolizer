import React , {useState} from "react";
import "./IconButtonStyle.css";
import gitHubIcon from 'F:/Algolizer/GS_Visualizer/src/assets/githubIcon.png';
import videoIcon from 'F:/Algolizer/GS_Visualizer/src/assets/videoIcon.png';
import arrowIcon from 'F:/Algolizer/GS_Visualizer/src/assets/arrowIcon.png'
function IconButtons() {
  const [videoHovered , setVideoHovered] = useState(false);
  const [gitHovered , setGitHovered] = useState(false);
  const [arrowHovered , setArrowHovered] = useState(false);
  const videoClick = () => {
  };

  const gitHubClick = () => {
  };

  const videoHoverEnter = () => {
    setVideoHovered(true);
  };

  const videoHoverLeave = () => {
    setVideoHovered(false);
  };

  const gitHoverEnter = () => {
    setGitHovered(true)
  };

  const gitHoverLeave = () => {
    setGitHovered(false);
  };

  const arrowHoverEnter = () => {
    setArrowHovered(true)
  };

  const arrowHoverLeave = () => {
    setArrowHovered(false);
  };

  return (
    <div className = "icons">
      <div className = "iconsDiv">
        <div className = "videodiv">
          <button className = "video"> 
            <img className = {`png ${videoHovered ? 'hovered' : ''}`} onMouseEnter={videoHoverEnter} onMouseLeave={videoHoverLeave} src = {videoIcon}></img>
          </button>
        </div>
        <div className = "gitdiv">
          <button className = {`git ${gitHovered ? 'hovered' : ''}`} onClick = {gitHubClick}>
            <img className = {`png ${gitHovered ? 'hovered' : ''}`} onMouseEnter={gitHoverEnter} onMouseLeave={gitHoverLeave} src = {gitHubIcon}></img>
          </button>
        </div>
      </div>
      <div className = "arrowDiv">
        <button className = "arrow">
        <img className ={`arrowPng ${arrowHovered ? 'hovered' : ''}`} onMouseEnter={arrowHoverEnter} onMouseLeave={arrowHoverLeave}  src = {arrowIcon}></img>
        </button>
      </div>
    </div>
  );
}
export default IconButtons;
