import React from "react";
import { useNavigate } from "react-router-dom";

import NotFoundImg from "../../assets/images/404.png";
import { BackButton, Container, NotFoundImage, Text } from "./styles";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container>
      <NotFoundImage src={NotFoundImg} alt="404" />
      <Text>Página não encontrada!</Text>
      <BackButton variant="contained" onClick={() => navigate("/")}>
        Voltar ao início
      </BackButton>
    </Container>
  );
}
