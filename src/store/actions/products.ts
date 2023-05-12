import { createAction } from "@reduxjs/toolkit";

import * as TYPES from "../types";

export const addProduct = createAction<ProductAction>(TYPES.ADD_PRODUCT);
export const editProduct = createAction<ProductAction>(TYPES.EDIT_PRODUCT);
export const setProducts = createAction<ProductsAction>(TYPES.SET_PRODUCTS);
export const deleteProduct = createAction<ProductAction>(TYPES.DELETE_PRODUCT);
export const setPage = createAction<PageAction>(TYPES.SET_PAGE);
export const addLastSeen = createAction<ProductAction>(TYPES.ADD_LAST_SEEN);
