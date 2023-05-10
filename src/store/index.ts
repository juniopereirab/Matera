import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./reducers/products";
import userReducer from "./reducers/user";

const reducer = {
  user: userReducer,
  product: productReducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
