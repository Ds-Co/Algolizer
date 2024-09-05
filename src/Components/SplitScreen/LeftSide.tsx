import SortingIcon from "../../assets/Sorting Icon.png";
import "../../Css/LeftSide.css";
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
