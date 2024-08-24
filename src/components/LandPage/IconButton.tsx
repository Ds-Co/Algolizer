import { useState } from "react";
import "./IconButtonStyle.css";
import gitHubIcon from "../../assets/githubIcon.png";
import videoIcon from "../../assets/videoIcon.png";
import arrowIcon from "../../assets/arrowIcon.png";
import { Link } from "react-router-dom";
const videoLink =
  "https://docs.google.com/document/d/1wSe3c5Pk82lZJgtE1njiQ98LDyY3Dlw9zReZuX7tExw/edit?usp=sharing";
const gitLink = "https://github.com/Ds-Co/GS_Visualizer";

interface Icon 
{
  icon: string;
  className: string;
  url: string;
}
function IconButton({ icon, className, url }: Icon) 
{
  const [Hovered, setHovered] = useState(false);
  const HoverEnter = () => setHovered(true);
  const HoverLeave = () => setHovered(false);
  const Click = () => window.open(url, "_blank");
  return (
    <img
      className={`${className} ${Hovered ? "hovered" : ""}`}
      onMouseEnter={HoverEnter}
      onMouseLeave={HoverLeave}
      src={icon}
      onClick={Click}
    ></img>
  );
}
function IconButtons() 
{
  return (
    <div className="icons">
      <div className="iconsDiv">
        <div className="videodiv">
          <button className="video">
            <IconButton icon={videoIcon} className="png" url={videoLink} />
          </button>
        </div>
        <div className="gitdiv">
          <button className="git">
            <IconButton icon={gitHubIcon} className="png" url={gitLink} />
          </button>
        </div>
      </div>
      <div className="arrowDiv">
        <Link to="/SplitScreen">
          <button className="arrow" >
          <img className="arrowPng" src={arrowIcon}/>
          </button>
        </Link>
      </div>
    </div>
  );
}
export {IconButtons};
