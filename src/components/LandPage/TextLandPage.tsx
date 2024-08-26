import "../../CSS/TextLandPageStyle.css"
function textLandPage() 
{
  const textArray1 = ["See ", "algorithms ", "in ", "action! "];
  const textArray2 = ["Graphs ", "and ", "sorting ", "made ", "easy. "];
  const textArray3 = ["Visual ", "learning, ", "better ", "understanding. "];
  return (
    <div className="textContainer">
      <div>
        {textArray1.map((text, index) => (
          <a
            key={index}
            className={`text ${index === 1 ? "darkColor" : "lightColor"}`}
          >
            {text}
          </a>
        ))}
      </div>
      <div>
        {textArray2.map((text, index) => (
          <a
            key={index}
            className={`text ${index >= 3 ? "darkColor" : "lightColor"}`}
          >
            {text}
          </a>
        ))}
      </div>
      <div>
        {" "}
        {textArray3.map((text, index) => (
          <a
            key={index}
            className={`text ${index >= 2 ? "lightColor" : "darkColor"}`}
          >
            {text}
          </a>
        ))}
      </div>
    </div>
  );
}
export default textLandPage;
