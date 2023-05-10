import { createAction } from "@reduxjs/toolkit";

import * as TYPES from "../types";

export const addProduct = createAction<ProductAction>(TYPES.ADD_PRODUCT);
export const editProduct = createAction<ProductAction>(TYPES.EDIT_PRODUCT);
export const setProducts = createAction<ProductAction>(TYPES.SET_PRODUCTS);
