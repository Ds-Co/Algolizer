import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandPage } from "./Components/LandPage/LandPage.tsx";
import { SplitScreen } from "./Components/SplitScreen/SplitScreen.tsx";
import { SortingScreen } from "./Components/AlgorithmsScreens/SortingScreen/SortingScreen.tsx";
import { GraphScreen } from "./Components/AlgorithmsScreens/GraphScreen/GraphScreen.tsx";
import GraphVisualization from "./Components/AlgorithmsScreens/GraphScreen/GraphVisualization.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <Router>
      <Routes>
        <Route path="/" element={<LandPage />}></Route>
        <Route path="/SplitScreen" element={<SplitScreen />}></Route>
        <Route path="/SortingScreen" element={<SortingScreen />}></Route>
        <Route path="/GraphScreen" element={<GraphScreen></GraphScreen>}></Route>
      </Routes>
    </Router> */}
    <GraphVisualization/>
  </StrictMode>
);
