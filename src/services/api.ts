import axios from "axios";

const apiUrl = process.env.REACT_APP_API;
const cepUrl = process.env.REACT_APP_CEP_API;

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const cepApi = axios.create({
  baseURL: cepUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
