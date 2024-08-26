import Logo from "../../assets/Algolizer (Inter Font).png";
import "../../CSS/LogoIconStyle.css";
function LogoIcon() {
  return (
    <div className="projectName">
      <img className="logo" src={Logo}></img>
    </div>
  );
}
export { LogoIcon };
