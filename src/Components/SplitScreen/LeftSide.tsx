import SortingIcon from "D:/Work/Algolizer project/Repo/GS_Visualizer/src/Assets/Sorting Icon.png";
import "D:/Work/Algolizer project/Repo/GS_Visualizer/src/Css/LeftSide.css";
function LeftSide() {
  return (
    <div className="LeftItem">
      <img src={SortingIcon} className="SortingImg"></img>
      <div className="Text">Sorting</div>
      <div className="SortingSlogan">
        “Sort Smarter,
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Not Harder.”
      </div>
    </div>
  );
}

export default LeftSide;
