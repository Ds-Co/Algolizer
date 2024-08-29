import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandPage } from './Components/LandPage/LandPage';
import { SplitScreen } from './Components/SplitScreen/SplitScreen';
import {App} from "./App.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandPage />}></Route>
        <Route path="/SplitScreen" element={<SplitScreen />}></Route>
        <Route path="/App" element={<App />}></Route>
      </Routes>
    </Router>
  </StrictMode>
);
