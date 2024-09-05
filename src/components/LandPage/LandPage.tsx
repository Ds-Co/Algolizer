import { IconButtons } from "./IconButton";
import { LogoIcon } from "./LogoIcon";
import { ParticleSystem } from "./BackGroundAnimation";
import TextLandPage from "./TextLandPage";
import "../../Css/BackGroundStyle.css";
function LandPage() {
  return (
    <div>
      <div className="PlexusEffect">
        <ParticleSystem />
      </div>
      <div>
        <IconButtons />
      </div>
      <div className="bulk">
        <LogoIcon />
        <TextLandPage />
      </div>
    </div>
  );
}
export { LandPage };
