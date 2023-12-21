import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import movieReducer from "./reducer/movieReducer";
import screenReducer from "./reducer/screenReducer";
import reservationReducer from "./reducer/reservationReducer";

const store = configureStore({
  reducer: {
    users: userReducer,
    movies: movieReducer,
    screens: screenReducer,
    reservations: reservationReducer,
  },
});

// Retrieve the token from local storage
const token = localStorage.getItem("accessToken");

// If a token exists, dispatch an action to log in the user automatically
if (token) {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data
  const role = localStorage.getItem("role"); // Retrieve user role
  store.dispatch({
    type: "LoginUserSuccess",
    payload: {
      user: user,
      token: token,
      role: role,
    },
  });
}

export default store;
