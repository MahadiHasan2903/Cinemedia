import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  screens: [],
  singleScreen: null,
  error: null,
};

const screenReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("CreateScreenRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("CreateScreenSuccess", (state, action) => {
      state.isLoading = false;
      state.screens.push(action.payload);
      state.error = null;
    })
    .addCase("CreateScreenFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("GetAllScreensRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("GetAllScreensSuccess", (state, action) => {
      state.isLoading = false;
      state.screens = action.payload;
      state.error = null;
    })
    .addCase("GetAllScreensFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("GetSingleScreenRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("GetSingleScreenSuccess", (state, action) => {
      state.isLoading = false;
      state.singleScreen = action.payload;
      state.error = null;
    })
    .addCase("GetSingleScreenFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("DeleteScreenRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("DeleteScreenSuccess", (state, action) => {
      state.isLoading = false;
      state.screens = state.screens.filter(
        (screen) => screen._id !== action.payload
      );
      state.error = null;
    })
    .addCase("DeleteScreenFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});

export default screenReducer;
