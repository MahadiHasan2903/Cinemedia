import axios from "axios";
import { server } from "../../server";

// Create a screen
export const createScreen = (screenData) => async (dispatch) => {
  try {
    dispatch({ type: "CreateScreenRequest" });

    const response = await axios.post(
      `${server}/screen/create-screen`,
      screenData
    );

    const { data } = response;

    dispatch({
      type: "CreateScreenSuccess",
      payload: data, // Just the payload data
    });

    return data; // Return the data
  } catch (error) {
    dispatch({
      type: "CreateScreenFail",
      payload: error.response.data.error,
    });

    throw error;
  }
};

// Get all screens
export const getAllScreens = () => async (dispatch) => {
  try {
    const response = await axios.get(`${server}/screen/get-all-screen`);
    dispatch({
      type: "GetAllScreensSuccess",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "GetAllScreensFail",
      payload: error.response.data.error,
    });
  }
};

// Get screen by ID
export const getSingleScreen = (screenId) => async (dispatch) => {
  try {
    const response = await axios.get(`${server}/screen/get-screen/${screenId}`);

    dispatch({
      type: "GetSingleScreenSuccess",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "GetSingleScreenFail",
      payload: error.response.data.error,
    });
  }
};

// Delete screen by ID
export const deleteScreen = (screenId) => async (dispatch) => {
  try {
    await axios.delete(`${server}/screen/delete-screen/${screenId}`);

    dispatch({
      type: "DeleteScreenSuccess",
      payload: screenId,
    });
  } catch (error) {
    dispatch({
      type: "DeleteScreenFail",
      payload: error.response.data.error,
    });
  }
};
