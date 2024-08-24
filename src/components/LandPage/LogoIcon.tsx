import Logo from "/src/assets/Algolizer_Logo-removebg.png";
import "./LogoIconStyle.css";
function LogoIcon() {
  return (
    <div className="projectName">
      <img className="logo" src={Logo}></img>
      <a className="logoText">lgolizer</a>
    </div>
  );
}
export {LogoIcon};
