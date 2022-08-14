import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Store from "storage/Store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(Store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </>
);
