import GraphIcon from "D:/Work/Algolizer project/Repo/GS_Visualizer/src/Assets/Graph Icon.png";
import "D:/Work/Algolizer project/Repo/GS_Visualizer/src/Css/RightSide.css";
function RightSide() {
  return (
    <div className="RightItem">
      <img src={GraphIcon} className="GraphImg"></img>
      <div className="Text">Graph</div>
      <div className="GraphSlogan">“Find your path.”</div>
    </div>
  );
}

export default RightSide;
