import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  reservations: [],
  singleReservation: null,
  error: null,
};

const reservationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("CreateReservationRequest", (state) => {
      state.isLoading = true;
      state.creating = true;
      state.error = null;
    })
    .addCase("CreateReservationSuccess", (state, action) => {
      state.isLoading = false;
      state.creating = false;
      state.reservations.push(action.payload);
      state.error = null;
    })
    .addCase("CreateReservationFail", (state, action) => {
      state.isLoading = false;
      state.creating = false;
      state.error = action.payload;
    })
    .addCase("GetAllReservationsRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("GetAllReservationsSuccess", (state, action) => {
      state.isLoading = false;
      state.reservations = action.payload;
      state.error = null;
    })
    .addCase("GetAllReservationsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("GetSingleReservationRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("GetSingleReservationSuccess", (state, action) => {
      state.isLoading = false;
      state.singleReservation = action.payload;
      state.error = null;
    })
    .addCase("GetSingleReservationFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("DeleteReservationRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("DeleteReservationSuccess", (state, action) => {
      state.isLoading = false;
      state.reservations = state.reservations.filter(
        (reservation) => reservation._id !== action.payload
      );
      state.error = null;
    })
    .addCase("DeleteReservationFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

export default reservationReducer;
