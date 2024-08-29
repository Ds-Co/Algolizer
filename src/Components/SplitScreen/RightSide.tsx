import GraphIcon from '../../assets/Graph Icon.png'
import '../../Css/RightSide.css'
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
