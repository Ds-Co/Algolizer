import  {useState} from "react";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./IconButtonStyle.css";
import gitHubIcon from 'F:/Algolizer/GS_Visualizer/src/assets/githubIcon.png';
import videoIcon from 'F:/Algolizer/GS_Visualizer/src/assets/videoIcon.png';
import arrowIcon from 'F:/Algolizer/GS_Visualizer/src/assets/arrowIcon.png';
const videoLink  = "https://docs.google.com/document/d/1wSe3c5Pk82lZJgtE1njiQ98LDyY3Dlw9zReZuX7tExw/edit?usp=sharing";
const gitLink = "https://github.com/Ds-Co/GS_Visualizer";

interface Icon{
  icon : string;
  className : string;
  url : string;
}
function IconButton({icon , className , url} : Icon){
  const [Hovered , setHovered] = useState(false);
  const HoverEnter = () => setHovered(true);
  const HoverLeave = () => setHovered(false);
  const Click = () => window.open(url, '_blank');
  return (
    <img className = {`${className} ${Hovered ? 'hovered' : ''}`} onMouseEnter={HoverEnter} onMouseLeave={HoverLeave} src = {icon} onClick={Click}></img>
  );

}
function IconButtons() {
  

  return (
    <div className = "icons">
      <div className = "iconsDiv">
        <div className = "videodiv">
          <button className = "video"> 
           <IconButton icon = {videoIcon} className="png" url = {videoLink}/>
          </button>
        </div>
        <div className = "gitdiv">
          <button className = "git">
            <IconButton icon = {gitHubIcon} className="png" url = {gitLink} />
          </button>
        </div>
      </div>
      <div className = "arrowDiv">
        <button className = "arrow">
        <IconButton icon = {arrowIcon} className="arrowPng" url = "https://github.com/Ds-Co/GS_Visualizer"/>
        </button>
      </div>
    </div>
  );
}
export default IconButtons;
