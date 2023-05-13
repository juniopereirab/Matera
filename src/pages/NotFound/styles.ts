import { Box, Button, Typography, styled } from "@mui/material";

export const Container = styled(Box)`
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const NotFoundImage = styled("img")`
  width: 100%;
  max-width: 400px;
`;

export const Text = styled(Typography)`
  font-size: 50px;
  font-weight: bold;
`;

export const BackButton = styled(Button)`
  width: 250px;
  height: 56px;
`;
