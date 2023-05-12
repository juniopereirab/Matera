import { api } from "./api";

const path = "/produto";

export const getProducts = async (token: string) => {
  api.defaults.headers.common.Authorization = token;

  const response = await api.get<IProduct[]>(path);
  return response.data;
};

export const getProduct = async (token: string, id: string) => {
  try {
    api.defaults.headers.common.Authorization = token;

    const response = await api.get<IProduct>(`${path}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Requisição invalida");
  }
};

export const addProduct = async (token: string, product: IProductData) => {
  api.defaults.headers.common.Authorization = token;
  const response = await api.post(path, product);

  return response.data[0];
};

export const editProduct = async (
  token: string,
  product: IProductData,
  productId: string
) => {
  api.defaults.headers.common.Authorization = token;
  try {
    const response = await api.put(`${path}/${productId}`, product);
    return response;
  } catch (error) {
    throw new Error("Requisição invalida");
  }
};

export const addUser = async (user: ISignUpForm) => {
  const response = await api.post(path, user);
  return response;
};

export const getAddress = async (cep: string) => {
  const response = await api.get<IViaCep>(`/${cep}/json`);
  return response.data;
};

export const deleteProduct = async (token: string, productId: string) => {
  api.defaults.headers.common.Authorization = token;
  try {
    const response = await api.delete(`${path}/${productId}`);
    return response;
  } catch (error) {
    throw new Error("Requisição invalida");
  }
};
