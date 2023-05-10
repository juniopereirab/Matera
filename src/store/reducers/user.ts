/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";

import { setLogged, setUnlogged } from "../actions/user";

const initialState: UserState = {
  user: null,
  isLogged: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLogged, (state, action) => {
      state.isLogged = action.payload.isLogged;
      state.user = action.payload.user;
    })
    .addCase(setUnlogged, (state, action) => {
      state.isLogged = action.payload.isLogged;
      state.user = action.payload.user;
    });
});

export default reducer;
