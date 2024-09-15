import React from "react";
import { ParticleSystem } from "../landPage/BackGroundAnimation";
import "../../css/ComplexityScreen.css";
function ComplexityScreen() {
  return (
    <div className="ComplexityScreenContainer">
      <div className="PlexusEffect">
        <ParticleSystem />
      </div>
      <div className="ComplexityScreenTextContainer">
        <h1 className="ComplexityScreenTitle">What is Complexity?</h1>
        <p className="ComplexityScreenMainBody">
          Algorithm complexity refers to the efficiency of an algorithm in terms
          of the resources it consumes, primarily time and space, as the input
          size grows. Time complexity describes how the execution time of an
          algorithm increases with the size of the input, while space complexity
          refers to the amount of memory required. The Big O notation is
          commonly used to express this complexity. It provides an upper bound
          on the growth rate of an algorithm's time or space requirements,
          helping to classify algorithms based on their worst-case performance.
          Common examples include O(1) for constant time, O(n) for linear time,
          and O(n²) for quadratic time. By analyzing algorithm complexity,
          developers can predict how their code will perform as the input scales
          and choose the most efficient approach for a given problem.
        </p>
      </div>
    </div>
  );
}

export { ComplexityScreen };
