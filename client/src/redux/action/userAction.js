import axios from "axios";
import { server } from "../../server";

export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: "RegisterUserRequest" });

  try {
    const response = await axios.post(`${server}/user/register`, userData);
    const { data } = response;

    dispatch({
      type: "RegisterUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "RegisterUserFail",
      payload: error.response.data.message,
    });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: "LoginUserRequest" });

  try {
    const response = await axios.post(`${server}/user/login`, userData);
    const { data } = response;

    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.user.role);

    dispatch({
      type: "LoginUserSuccess",
      payload: {
        user: data.user,
        token: data.token,
        role: data.user.role,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: "LoginUserFail",
      payload: error.response.data.message,
    });

    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: "LogoutUserRequest" });

  try {
    await axios.post(`${server}/user/logout`);

    dispatch({ type: "LogoutUserSuccess" });
  } catch (error) {
    dispatch({
      type: "LogoutUserFail",
      payload: error.response.data.message,
    });
  }
};

export const getSingleUser = (userId) => async (dispatch) => {
  dispatch({ type: "GetSingleUserRequest" });

  try {
    const response = await axios.get(`${server}/user/users/${userId}`);
    const { data } = response;

    dispatch({
      type: "GetSingleUserSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "GetSingleUserFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GetAllUsersRequest" });

  try {
    const response = await axios.get(`${server}/user/users`);
    const { data } = response;

    dispatch({
      type: "GetAllUsersSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "GetAllUsersFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: "DeleteUserRequest" });

  try {
    await axios.delete(`${server}/user/users/${userId}`);

    dispatch({
      type: "DeleteUserSuccess",
      payload: userId,
    });
  } catch (error) {
    dispatch({
      type: "DeleteUserFail",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => ({
  type: "clearErrors",
});
