import LeftSide from "./Components/SplitScreen/LeftSide";
import RightSide from "./Components/SplitScreen/RightSide";
import "./Css/SplitScreen.css";
import PlexusEffect from "./Components/SplitScreen/PlexusEffect";
function MainPage() {
  return (
    <div className="WholePage">
      <PlexusEffect />
      <div className="SplitScreenBackButton">GO BACK</div>
      <LeftSide></LeftSide>
      <div className="MiddleBar"></div>
      <RightSide></RightSide>
    </div>
  );
}

export default MainPage;
