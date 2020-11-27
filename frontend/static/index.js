import App from "./components/App"
import React from "react";
import {render} from "react-dom";
import "react-datepicker/dist/react-datepicker.min.css";

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
