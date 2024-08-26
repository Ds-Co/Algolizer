import LeftSide from './LeftSide';
import RightSide from './RightSide'
import '../../Css/SplitScreen.css'
import PlexusEffect from './PlexusEffect';
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
