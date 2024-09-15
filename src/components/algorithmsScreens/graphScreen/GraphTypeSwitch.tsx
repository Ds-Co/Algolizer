import React from "react";
import "../../../css/GraphTypeSwitch.css";

interface GraphTypeSwitchProps {
  isDirected: boolean;
  onTypeChange: (isDirected: boolean) => void;
}

const GraphTypeSwitch: React.FC<GraphTypeSwitchProps> = ({
  isDirected,
  onTypeChange,
  
}) => {
  const handleToggle = () => {
    onTypeChange(!isDirected);
  };

  return (
    <div className="graph-type-switch">
      <span className={`switch-option ${isDirected ? "active" : ""}`}>
        Directed
      </span>
      <div className="switch-toggle" onClick={handleToggle}>
        <div
          className={`toggle-button ${isDirected ? "" : "undirected"}`}
        ></div>
      </div>
      <span className={`switch-option ${!isDirected ? "active" : ""}`}>
        Undirected
      </span>
    </div>
  );
};

export { GraphTypeSwitch };