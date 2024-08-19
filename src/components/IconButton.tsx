import React from "react";
import "./IconButtonStyle.css";
import gitHubIcon from "C:/Users/Mohamed Bakry/OneDrive/Desktop/Algolizer/GS_Visualizer/src/assets/githubIcon.png";
import videoIcon from "C:/Users/Mohamed Bakry/OneDrive/Desktop/Algolizer/GS_Visualizer/src/assets/videoIcon.png";
function IconButtons() {
  const handleVideoClick = () => {
    console.log("Video button clicked");
  };

  const handleGitHubClick = () => {
    console.log("GitHub button clicked");
  };
  return (
    <div className="iconsDiv">
      <div className="videodiv">
        <button className="video " onClick={handleVideoClick}>
          <img className="png" src={videoIcon}></img>{" "}
        </button>
      </div>
      <div className="gitdiv">
        <button className="git" onClick={handleGitHubClick}>
          <img className="png" src={gitHubIcon}></img>
        </button>
      </div>
      
    </div>
  );
}
export default IconButtons;
