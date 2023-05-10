import { CssBaseline, Box, styled } from "@mui/material";
import React from "react";

import "./App.css";

const MyComponent = styled(Box)({
  width: "120px",
  height: "120px",
  background: "red",
});

function App() {
  return (
    <>
      <CssBaseline />
      <MyComponent />
    </>
  );
}

export default App;
