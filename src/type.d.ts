interface IUser {
  id: number;
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string | number;
  cpf: string | number;
  dt_nascimento: string | number | Date;
  email: string;
  estado: string;
  image: string;
  logradouro: string;
  nome: string;
  senha: string;
  sexo: string;
  sobrenome: string;
  token: string;
}

type UserAction = {
  user: IUser | null;
  isLogged: boolean;
};

type UserState = {
  info: IUser | null;
  isLogged: boolean;
};

type IProduct = {
  id: number;
  avatar: string;
  createdAt: string;
  marca: string;
  nome: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
};

interface IProductData {
  avatar: string;
  createdAt: string;
  marca: string;
  nome: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
}

type ProductAction = {
  product: IProduct;
};

type ProductsAction = {
  products: IProduct[];
};

type PageAction = {
  page: number;
};

type ProductState = {
  list: IProduct[];
  currentPage: number;
  lastSeen: IProduct[];
};

type MainState = {
  user: UserState;
  product: ProductState;
};

interface ISignInForm {
  email: string;
  password: string;
}

enum Gender {
  MALE = "male",
  FEMALE = "female",
  NON_BINARY = "non_binary",
}

interface IAddress {
  cep: string;
  cidade: string;
  estado: string;
  logradouro: string;
  bairro: string;
  complemento: string;
}

interface ISignUpForm {
  name: string;
  surname: string;
  cpf: string;
  email: string;
  password: string;
  gender: Gender;
  birthdate: Date | string | number;
  address: IAddress;
}

interface IViaCep {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}
