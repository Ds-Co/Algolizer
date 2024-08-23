import IconButtons from './IconButton';
import LogoIcon from './LogoIcon';
import TextLandPage from './TextLandPage';
function LandPage() {
  return (
    <div className="container">
    <div>
      <IconButtons/>
    </div>
    <div className='bulk'>
      <div>
        <LogoIcon/>
      </div>
      <div>
        <TextLandPage/>
      </div>
      </div>
    </div>
  );
}
export default LandPage;
