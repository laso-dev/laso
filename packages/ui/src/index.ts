import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.js";

declare global {
  interface Window {
    __INITIAL_STATE__: {
      apiUrl: string;
      basename: string;
    };
  }
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(React.createElement(App));
