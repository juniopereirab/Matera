import * as Yup from "yup";

const CPFRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const CEPRegex = /^\d{5}-\d{3}$/;

enum Gender {
  MALE = "male",
  FEMALE = "female",
  NON_BINARY = "non_binary",
}

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const addressSchema = Yup.object().shape({
  cep: Yup.string().required().matches(CEPRegex),
  cidade: Yup.string().required(),
  estado: Yup.string().required(),
  logradouro: Yup.string().required(),
  bairro: Yup.string().required(),
  complemento: Yup.string(),
});

export const SignUpSchema = Yup.object().shape({
  name: Yup.string().required(),
  surname: Yup.string().required(),
  cpf: Yup.string().matches(CPFRegex).required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  gender: Yup.mixed().oneOf(Object.values(Gender)).required(),
  birthdate: Yup.date().max(new Date()).required(),
  address: addressSchema,
});

export const ProductSchema = Yup.object().shape({
  nome: Yup.string().required(),
  avatar: Yup.string().required(),
  marca: Yup.string().required(),
  preco: Yup.string().required(),
  qt_estoque: Yup.number().required(),
  qt_vendas: Yup.number().required(),
  createdAt: Yup.string().required(),
});
