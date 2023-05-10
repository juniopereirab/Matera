/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";

import { addProduct, editProduct, setProducts } from "../actions/products";

const initialState: ProductState = {
  products: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addProduct, (state, action) => {
      state.products.push(action.payload.product);
    })
    .addCase(editProduct, (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.product.id
      );
      state.products[index] = action.payload.product;
    })
    .addCase(setProducts, (state, action) => {
      state.products = action.payload.products;
    });
});

export default reducer;
