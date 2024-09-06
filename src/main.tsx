import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandPage } from "./components/landPage/LandPage.tsx";
import { SplitScreen } from "./components/splitScreen/SplitScreen.tsx";
import { SortingScreen } from "./components/algorithmsScreens/sortingScreen/SortingScreen.tsx";
import { GraphScreen } from "./components/algorithmsScreens/graphScreen/GraphScreen.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {
      <Router>
        <Routes>
          <Route path="/" element={<LandPage />}></Route>
          <Route path="/SplitScreen" element={<SplitScreen />}></Route>
          <Route path="/SortingScreen" element={<SortingScreen />}></Route>
          <Route
            path="/GraphScreen"
            element={<GraphScreen></GraphScreen>}
          ></Route>
        </Routes>
      </Router>
    }
  </StrictMode>
);
