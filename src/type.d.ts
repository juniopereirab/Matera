interface IUser {
  id: number;
  name: string;
}

type UserAction = {
  type: string;
  user: IUser;
  isLogged: boolean;
};

type UserState = {
  user: IUser | null;
  isLogged: boolean;
};

type IProduct = {
  id: number;
  name: string;
};

type ProductAction = {
  type: string;
  product: IProduct;
  products: IProduct[];
};

type ProductState = {
  products: IProduct[];
};

type MainState = UserState & ProductState;
