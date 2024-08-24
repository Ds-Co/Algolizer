import IconButtons from "./IconButton";
import LogoIcon from "./LogoIcon";
import TextLandPage from "./TextLandPage";
import ParticleSystem from "./BackGroundAnimation";
function LandPage() {
  return (
    <div className="container">
      <div>
        <IconButtons />
      </div>
      <div className="bulk">
        <LogoIcon />
        <TextLandPage />
      </div>
      <ParticleSystem/>
    </div>
  );
}
export default LandPage;
