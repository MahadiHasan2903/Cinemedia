import axios from "axios";
import { server } from "../../server";

// movieActions.js
export const createMovie = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "CreateMovieRequest" });

    const response = await axios.post(
      `${server}/movie/create-movie`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: "CreateMovieSuccess",
      payload: response,
    });

    return response;
  } catch (error) {
    dispatch({
      type: "CreateMovieFail",
      payload: error.response.data.error,
    });

    throw error;
  }
};

// Get all movies
export const getAllMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${server}/movie/get-all-movies`);
    dispatch({
      type: "GetAllMoviesSuccess",
      payload: response.data.movies,
    });
  } catch (error) {
    dispatch({
      type: "GetAllMoviesFail",
      payload: error.response.data.message,
    });
  }
};

// Get movie by ID
export const getSingleMovie = (movieId) => async (dispatch) => {
  try {
    const response = await axios.get(`${server}/movie/get-movie/${movieId}`);

    dispatch({
      type: "GetSingleMovieSuccess",
      payload: response.data.movie,
    });
  } catch (error) {
    dispatch({
      type: "GetSingleMovieFail",
      payload: error.response.data.message,
    });
  }
};

// Delete movie by ID
export const deleteMovie = (movieId) => async (dispatch) => {
  try {
    await axios.delete(`${server}/movie/delete-movie/${movieId}`);

    dispatch({
      type: "DeleteMovieSuccess",
      payload: movieId,
    });
  } catch (error) {
    dispatch({
      type: "DeleteMovieFail",
      payload: error.response.data.message,
    });
  }
};
