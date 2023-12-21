import axios from "axios";
import { server } from "../../server";

export const createReservation = (reservationData) => async (dispatch) => {
  try {
    dispatch({ type: "CreateReservationRequest" });

    const response = await axios.post(
      `${server}/reservation/create-reservation`,
      reservationData
    );

    const { data } = response;

    dispatch({
      type: "CreateReservationSuccess",
      payload: data,
    });

    return response;
  } catch (error) {
    dispatch({
      type: "CreateReservationFail",
      payload: error.response.data.error,
    });

    throw error;
  }
};

export const getAllReservations = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${server}/reservation/get-all-reservations`
    );
    dispatch({
      type: "GetAllReservationsSuccess",
      payload: response.data.reservations,
    });
  } catch (error) {
    dispatch({
      type: "GetAllReservationsFail",
      payload: error.response.data.message,
    });
  }
};

export const getSingleReservation = (reservationId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${server}/reservation/get-reservation/${reservationId}`
    );

    dispatch({
      type: "GetSingleReservationSuccess",
      payload: response.data.reservation,
    });
  } catch (error) {
    dispatch({
      type: "GetSingleReservationFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteReservation = (reservationId) => async (dispatch) => {
  try {
    await axios.delete(
      `${server}/reservation/delete-reservation/${reservationId}`
    );

    dispatch({
      type: "DeleteReservationSuccess",
      payload: reservationId,
    });
  } catch (error) {
    dispatch({
      type: "DeleteReservationFail",
      payload: error.response.data.message,
    });
  }
};
