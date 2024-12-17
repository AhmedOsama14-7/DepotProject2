import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import arLang from "./locales/ar/common.json";
import enLang from "./locales/en/common.json";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <App /> 
  </StrictMode>
);
