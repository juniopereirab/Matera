import { CssBaseline, Box, styled } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";

import "./App.css";
import store from "./store";

const MyComponent = styled(Box)({
  width: "120px",
  height: "120px",
  background: "red",
});

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <MyComponent />
    </Provider>
  );
}

export default App;
