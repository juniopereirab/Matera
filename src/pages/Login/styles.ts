import {
  TextField,
  Button as MButton,
  styled,
  Stack,
  Box,
} from "@mui/material";

export const MajorContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
`;

export const Container = styled(Stack)`
  max-width: 300px;
`;

export const Input = styled(TextField)``;

export const Button = styled(MButton)``;

export const Image = styled("img")`
  margin-bottom: 30px;
`;
