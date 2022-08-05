import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Poppins", "GangwonEduAll:700", "undefined:"],
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
