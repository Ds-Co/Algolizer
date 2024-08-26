import Logo from "../../assets/Algolizer (Inter Font).png";
import "./LogoIconStyle.css";
function LogoIcon() {
  return (
    <div className="projectName">
      <img className="logo" src={Logo}></img>
    </div>
  );
}
export { LogoIcon };
