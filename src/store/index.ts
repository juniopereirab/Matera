import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

import productReducer from "./reducers/products";
import userReducer from "./reducers/user";

const persistConfig = {
  key: "root",
  storage,
};

const sessionPersistConfig = {
  key: "user",
  storage: storageSession,
};

const reducer = {
  user: persistReducer(sessionPersistConfig, userReducer),
  product: persistReducer(persistConfig, productReducer),
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
