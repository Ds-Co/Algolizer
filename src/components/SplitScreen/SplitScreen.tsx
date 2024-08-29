import LeftSide from './LeftSide';
import RightSide from './RightSide';
import "../../Css/SplitScreen.css";
import { ParticleSystem } from "../LandPage/BackGroundAnimation";
import { Link } from "react-router-dom";
import ArrowIcon from "../../assets/arrowIcon.png";
function SplitScreen() {
  return (
    <div className="WholePage">
      <div className="PlexusEffectSplitScreen">
        <ParticleSystem />
      </div>
      <div className="SplitScreenBackButton">
        <Link to="/">
          <button className="arrow">
            <img className="arrowPng" src={ArrowIcon} />
          </button>
        </Link>
      </div>
      <Link to = "/App">
        <button>
          <LeftSide></LeftSide>
        </button>
      </Link>
      <div className="MiddleBar"></div>
      <RightSide></RightSide>
    </div>
  );
}

export {SplitScreen};
