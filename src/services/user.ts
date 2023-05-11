import { AxiosResponse } from "axios";

import { api } from "./api";

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
