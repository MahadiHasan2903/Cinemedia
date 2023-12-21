import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  token: null,
  users: [],
  error: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("RegisterUserRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("RegisterUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase("RegisterUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("LoginUserRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("LoginUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.error = null;
    })
    .addCase("LoginUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("LogoutUserSuccess", (state) => {
      return { ...initialState };
    })
    .addCase("LogoutUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("GetSingleUserRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("GetSingleUserSuccess", (state, action) => {
      state.isLoading = false;
      state.singleUser = action.payload;
      state.error = null;
    })
    .addCase("GetSingleUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("GetAllUsersRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("GetAllUsersSuccess", (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = null;
    })
    .addCase("GetAllUsersFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("DeleteUserRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("DeleteUserSuccess", (state, action) => {
      state.isLoading = false;
      state.users = state.users.filter((user) => user._id !== action.payload);
      state.error = null;
    })
    .addCase("DeleteUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.error("Delete user failed:", action.payload);
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

export default userReducer;
