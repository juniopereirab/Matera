import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
// import { useDispatch } from "react-redux";
import ReactInputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

import MateraLogo from "../../assets/images/logo-azul.png";
import { addUser, getAddress } from "../../services/user";
import { SignUpSchema } from "../../utils/validators/schemas";
import {
  Button,
  Container,
  Image,
  Input,
  Item,
  MajorContainer,
} from "./styles";

enum Gender {
  MALE = "male",
  FEMALE = "female",
  NON_BINARY = "non_binary",
}

const initialValues: ISignUpForm = {
  name: "",
  email: "",
  password: "",
  surname: "",
  gender: Gender.MALE,
  cpf: "",
  birthdate: "",
  address: {
    cep: "",
    cidade: "",
    bairro: "",
    complemento: "",
    estado: "",
    logradouro: "",
  },
};

export default function Register() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendToLogin = () => {
    navigate("/");
  };

  const onSubmit = async (values: ISignUpForm) => {
    await addUser(values);
    sendToLogin();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: SignUpSchema,
    enableReinitialize: true,
  });

  const validateAddress = async (
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChange(event);
    const cep = event.target.value;
    const formattedCep = cep.replace(/\D/g, "");

    if (formattedCep.length === 8) {
      const address = await getAddress(formattedCep);
      formik.setValues({
        ...formik.values,
        address: {
          bairro: address.bairro,
          cidade: address.localidade,
          estado: address.uf,
          logradouro: address.logradouro,
          complemento: address.complemento,
          cep: address.cep,
        },
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate = (date: any) => {
    formik.setValues({
      ...formik.values,
      birthdate: new Date(date.$d || null),
    });
  };

  return (
    <MajorContainer>
      <Container container spacing={2}>
        <Item item xs={12}>
          <Image src={MateraLogo} alt="matera logo" />
        </Item>
        <Item item xs={12} sm={6}>
          <Input
            id="name"
            label="Nome"
            variant="outlined"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />
        </Item>
        <Item item xs={12} sm={6}>
          <Input
            id="surname"
            label="Sobrenome"
            variant="outlined"
            type="text"
            value={formik.values.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="surname"
          />
        </Item>
        <Item item xs={12} sm={4}>
          <Input
            id="cpf"
            label="CPF"
            variant="outlined"
            type="text"
            value={formik.values.cpf}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="cpf"
            InputProps={{
              inputComponent: ReactInputMask,
              inputProps: {
                mask: "999.999.999-99",
                maskChar: " ",
              },
            }}
          />
        </Item>
        <Item item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="gender">Gênero</InputLabel>
            <Select
              labelId="gender"
              id="gender-select"
              value={formik.values.gender}
              label="Gênero"
              onChange={formik.handleChange}
              name="gender"
            >
              <MenuItem value={Gender.MALE}>Masculino</MenuItem>
              <MenuItem value={Gender.FEMALE}>Feminino</MenuItem>
              <MenuItem value={Gender.NON_BINARY}>Não binário</MenuItem>
            </Select>
          </FormControl>
        </Item>
        <Item item xs={12} sm={5}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data de Nascimento"
              onChange={(value) => handleDate(value)}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </Item>
        <Item item xs={12} sm={4}>
          <Input
            id="cep"
            label="CEP"
            variant="outlined"
            type="text"
            value={formik.values.address.cep}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              validateAddress(formik.handleChange, e)
            }
            onBlur={formik.handleBlur}
            name="address.cep"
            InputProps={{
              inputComponent: ReactInputMask,
              inputProps: {
                mask: "99999-999",
                maskChar: " ",
              },
            }}
          />
        </Item>
        <Item item xs={12} sm={8}>
          <Input
            id="logradouro"
            label="Logradouro"
            variant="outlined"
            type="text"
            value={formik.values.address.logradouro}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="address.logradouro"
          />
        </Item>
        <Item item xs={12} sm={6}>
          <Input
            id="bairro"
            label="Bairro"
            variant="outlined"
            type="text"
            value={formik.values.address.bairro}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="address.bairro"
          />
        </Item>
        <Item item xs={12} sm={6}>
          <Input
            id="cidade"
            label="Cidade"
            variant="outlined"
            type="text"
            value={formik.values.address.cidade}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="address.cidade"
          />
        </Item>
        <Item item xs={12} sm={2}>
          <Input
            id="estado"
            label="Estado"
            variant="outlined"
            type="text"
            value={formik.values.address.estado}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="address.estado"
          />
        </Item>
        <Item item xs={12} sm={10}>
          <Input
            id="complemento"
            label="Complemento"
            variant="outlined"
            type="text"
            value={formik.values.address.complemento}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="address.complemento"
          />
        </Item>
        <Item item xs={12} sm={6}>
          <Input
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
        </Item>
        <Item item xs={12} sm={6}>
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
        </Item>

        <Item item xs={12} sm={6}>
          <Button
            type="submit"
            onClick={formik.handleSubmit}
            variant="contained"
            disabled={!formik.isValid || !formik.dirty}
          >
            Finalizar Cadastro
          </Button>
        </Item>
        <Item item xs={12} sm={6}>
          <Button type="button" variant="text" onClick={() => sendToLogin()}>
            Voltar para Login
          </Button>
        </Item>
      </Container>
    </MajorContainer>
  );
}
