import { AxiosResponse } from "axios";

import { api, cepApi } from "./api";

const path = "/user";

export const getUsers = async () => {
  const response: AxiosResponse<IUser[]> = await api.get(path);

  return response.data;
};

export const getUser = async (email: string) => {
  const response: AxiosResponse<IUser[]> = await api.get(path, {
    params: { search: email },
  });

  return response.data[0];
};

export const addUser = async (user: ISignUpForm) => {
  try {
    const response = await api.post(path, user);
    return response;
  } catch (error) {
    throw new Error("Requisição inválida");
  }
};

export const getAddress = async (cep: string) => {
  const response = await cepApi.get(`/${cep}/json`);
  return response.data;
};
