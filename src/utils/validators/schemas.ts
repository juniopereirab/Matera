import * as Yup from "yup";

const CPFRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

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
  cep: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  street: Yup.string().required(),
  neighborhood: Yup.string().required(),
  complement: Yup.string(),
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
