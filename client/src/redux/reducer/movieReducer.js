import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  movies: [],
  singleMovie: null,
  error: null,
};

const movieReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("CreateMovieRequest", (state) => {
      state.isLoading = true;
      state.creating = true;
      state.error = null;
    })
    .addCase("CreateMovieSuccess", (state, action) => {
      state.isLoading = false;
      state.creating = false;
      state.movies.push(action.payload);
      state.error = null;
    })

    .addCase("CreateMovieFail", (state, action) => {
      state.isLoading = false;
      state.creating = false;
      state.error = action.payload;
    })
    .addCase("GetAllMoviesRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("GetAllMoviesSuccess", (state, action) => {
      state.isLoading = false;
      state.movies = action.payload;
      state.error = null;
    })
    .addCase("GetAllMoviesFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("GetSingleMovieRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("GetSingleMovieSuccess", (state, action) => {
      state.isLoading = false;
      state.singleMovie = action.payload;
      state.error = null;
    })
    .addCase("GetSingleMovieFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("DeleteMovieRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("DeleteMovieSuccess", (state, action) => {
      state.isLoading = false;
      state.movies = state.movies.filter(
        (movie) => movie._id !== action.payload
      );
      state.error = null;
    })
    .addCase("DeleteMovieFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

export default movieReducer;
