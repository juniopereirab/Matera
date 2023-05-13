import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import MateraLogo from "../../assets/images/logo-azul.png";
import { getUser } from "../../services/user";
import { setLogged } from "../../store/actions/user";
import { SignInSchema } from "../../utils/validators/schemas";
import { Button, Container, Image, Input, MajorContainer } from "./styles";

const initialValues: ISignInForm = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: ISignInForm) => {
    const user = await getUser(values.email);

    if (user.senha === values.password) {
      dispatch(
        setLogged({
          user,
          isLogged: true,
        })
      );
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: SignInSchema,
    enableReinitialize: true,
  });

  const sendToRegister = () => {
    navigate("/register");
  };
  console.log(formik);
  return (
    <MajorContainer>
      <Container spacing={2}>
        <Image src={MateraLogo} alt="matera logo" />
        <Input
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
          error={Boolean(formik.errors.email)}
        />
        <Input
          id="password"
          label="Senha"
          variant="outlined"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
        />
        <Button
          type="submit"
          variant="contained"
          onClick={formik.handleSubmit}
          disabled={!formik.isValid || !formik.dirty}
        >
          Fazer Login
        </Button>
        <Button type="button" variant="text" onClick={() => sendToRegister()}>
          Cadastrar-se
        </Button>
      </Container>
    </MajorContainer>
  );
}
