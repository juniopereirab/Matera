import { CssBaseline } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";

import AppRoutes from "./router";
import { store, persistor } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssBaseline />
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
