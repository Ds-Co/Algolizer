import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Css/index.css";
import MainPage from "./SplitScreen";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainPage></MainPage>
  </StrictMode>
);
