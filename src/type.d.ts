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
  user: IUser;
  isLogged: boolean;
};

type UserState = {
  info: IUser | null;
  isLogged: boolean;
};

type IProduct = {
  id: number;
  name: string;
};

type ProductAction = {
  product: IProduct;
  products: IProduct[];
};

type ProductState = {
  products: IProduct[];
};

type MainState = {
  user: UserState;
  product: ProductState;
};

interface ISignInForm {
  email: string;
  password: string;
}

interface IAddress {
  cep: string;
  cidade: string;
  estado: string;
  logradouro: string;
  bairro: string;
  complemento: string;
}
