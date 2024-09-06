import "../../css/BackGroundStyle.css";
import { ParticleSystem } from "./BackGroundAnimation";
import { IconButtons } from "./IconButton";
import { LogoIcon } from "./LogoIcon";
import TextLandPage from "./TextLandPage";
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
