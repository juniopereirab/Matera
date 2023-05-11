import { TextField, Button as MButton, styled, Grid, Box } from "@mui/material";

export const MajorContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
`;

export const Container = styled(Grid)`
  max-width: 630px;
`;

export const Item = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Input = styled(TextField)`
  width: 100%;
`;

export const Button = styled(MButton)`
  width: 100%;
`;

export const Image = styled("img")`
  margin-bottom: 30px;
  max-width: 300px;
`;
