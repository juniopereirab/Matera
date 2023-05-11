import { AxiosResponse } from "axios";

import { api } from "./api";

const path = "/produto";

export const getProducts = async () => {
  const response = await api.get(path);

  return response.data;
};

export const addProduct = async (product: IProductRegister) => {
  const response: AxiosResponse<IUser[]> = await api.post(path, product);

  return response.data[0];
};

export const addUser = async (user: ISignUpForm) => {
  const response = await api.post(path, user);
  return response;
};

export const getAddress = async (cep: string) => {
  const response = await api.get<IViaCep>(`/${cep}/json`);
  return response.data;
};
