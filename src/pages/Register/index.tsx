import { Box, styled } from "@mui/material";
import React from "react";

const MyComponent = styled(Box)({
  width: "120px",
  height: "120px",
  background: "blue",
});

export default function Register() {
  return <MyComponent />;
}
