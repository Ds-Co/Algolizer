import {IconButtons} from "./IconButton";
import {LogoIcon} from "./LogoIcon";
import {ParticleSystem} from "./BackGroundAnimation";
import TextLandPage from "./TextLandPage";
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
export {LandPage};
