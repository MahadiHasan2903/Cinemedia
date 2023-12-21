import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllScreens } from "../redux/action/screenAction";
import moment from "moment";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import SeatBookingLayout from "../components/SeatBooking/SeatBookingLayout";
import { GiTheater } from "react-icons/gi";
import {
  createReservation,
  getAllReservations,
} from "../redux/action/reservationAction";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../server";

const BookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { movieName, theaterName, showDate, selectedShowtime, ticketPrice } =
    location.state;
  const [cardName, setCardName] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableHalls, setAvailableHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState("");
  const screens = useSelector((state) => state.screens.screens);
  const reservations = useSelector((state) => state.reservations.reservations);
  const [reservedSeats, setReservedSeats] = useState([]);

  const stripe = useStripe();
  const elements = useElements();
  const totalTicketPrice = ticketPrice * selectedSeats.length;

  useEffect(() => {
    dispatch(getAllScreens());
  }, [dispatch]);

  useEffect(() => {
    const formattedShowDate = moment(showDate, "MMMM D, YYYY").format(
      "YYYY-MM-DD"
    );

    const filteredScreens = screens.filter(
      (screen) =>
        screen.name === movieName &&
        moment(screen.screenDate).utc().format("YYYY-MM-DD") ===
          formattedShowDate &&
        screen.showtimes.includes(selectedShowtime) &&
        screen.theaterName === theaterName
    );

    const halls = [...new Set(filteredScreens.map((screen) => screen.hall))];

    setAvailableHalls(halls);
    setSelectedHall(halls[0] || "");
  }, [screens, movieName, showDate, selectedShowtime, theaterName]);

  useEffect(() => {
    dispatch(getAllReservations());
  }, [dispatch, selectedHall, availableHalls]);

  useEffect(() => {
    const matchingReservations = reservations.filter((reservation) => {
      const isMatching =
        reservation.movieName === movieName &&
        reservation.theaterName === theaterName &&
        reservation.showDate === showDate &&
        reservation.selectedShowtime === selectedShowtime &&
        parseInt(reservation.selectedHall) === parseInt(selectedHall);

      return isMatching;
    });

    const updatedReservedSeats = matchingReservations.reduce(
      (seats, reservation) => seats.concat(reservation.selectedSeats),
      []
    );

    setReservedSeats(updatedReservedSeats);
  }, [
    movieName,
    theaterName,
    showDate,
    selectedShowtime,
    selectedHall,
    reservations,
    availableHalls,
  ]);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat)
        : [...prevSelectedSeats, seat]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const paymentData = {
        amount: totalTicketPrice * 100,
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) {
        toast.error("Stripe or Elements not initialized.");
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const reservationData = {
            movieName,
            theaterName,
            showDate,
            selectedShowtime,
            selectedHall,
            selectedSeats,
            totalTicketPrice,
            paymentInfo: {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
              type: "Credit Card",
            },
          };

          const response = await dispatch(createReservation(reservationData));

          if (response) {
            toast.success("Reservation Created Successfully");
            navigate("/ticket", {
              state: {
                movieName,
                theaterName,
                showDate,
                selectedShowtime,
                selectedHall,
                selectedSeats,
                totalTicketPrice,
              },
            });
          } else {
            toast.error(response.payload);
          }
        } else {
          toast.error("Payment processing failed. Please try again.");
        }
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <div className="block w-full m-1 800px:flex">
      <div className="w-full 800px:w-[50%] text-center mb-5">
        <h5 className="text-[30px] font-Poppins text-black mb-5">
          Choose your seat
        </h5>
        <div className="flex items-center justify-center mb-5">
          <GiTheater className="text-[100px] 800px:text-[200px] text-[#56D2C4]" />
        </div>
        <SeatBookingLayout
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
          reservedSeats={reservedSeats}
        />
      </div>

      <div className="w-full 800px:w-[50%]  bg-white 800px:mr-5 shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
        <h5 className="text-[30px] font-Poppins text-center text-black">
          Book Your Reservation
        </h5>
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label className="pb-2 text-black">
              Movie Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              defaultValue={movieName}
              readOnly
            />
          </div>
          <br />
          <div>
            <label className="pb-2 text-black">
              Theater Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={theaterName}
              readOnly
            />
          </div>
          <br />
          <div>
            <label className="pb-2 text-black">
              Show date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              defaultValue={showDate}
              readOnly
            />
          </div>
          <br />
          <div>
            <label className="pb-2 text-black">
              Show Time<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              defaultValue={selectedShowtime}
              readOnly
            />
          </div>

          <br />
          <div>
            <label className="pb-2 text-black">
              Choose Hall No<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px] cursor-pointer"
              value={selectedHall}
              onChange={(e) => setSelectedHall(e.target.value)}
            >
              {selectedHall === "" && <option value="">Choose a Hall</option>}
              {availableHalls
                .map((hall) => String(hall)) // Convert non-strings to strings
                .sort((a, b) => a.localeCompare(b)) // Sort the halls in ascending order
                .map((hall, index) => (
                  <option key={index} value={hall}>
                    {hall}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="pb-2 text-black">
              Seat No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedSeats.join(", ")}
              placeholder="Select your seats"
              readOnly
            />
          </div>

          <div className="mt-5">
            <label className="text-black ">
              Ticket Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={totalTicketPrice}
              readOnly
            />
          </div>
          <br />
          <div className="w-full pb-3 ">
            <div className="w-[50%] mb-5">
              <label className="block text-[black] ">
                Name On Card <span className="text-red-500">*</span>{" "}
              </label>
              <input
                required
                placeholder="Enter your name...."
                className={`w-full border p-1 rounded-[5px]  text-[#444]`}
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="w-[50%] mb-5">
              <label className="block pb-3 text-[black]">
                Exp Date <span className="text-red-500">*</span>{" "}
              </label>
              <CardExpiryElement
                className="w-full border p-1 rounded-[5px]"
                options={{
                  style: {
                    base: {
                      fontSize: "15px",
                      lineHeight: 1.5,
                      color: "#444",
                    },
                    empty: {
                      color: "#3a120a",
                      backgroundColor: "transparent",
                      "::placeholder": {
                        color: "#444",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="w-full pb-3 ">
            <div className="w-[50%] mb-5">
              <label className="block pb-3 text-[black]">
                Card Number <span className="text-red-500">*</span>{" "}
              </label>
              <CardNumberElement
                className={`w-full border p-1 rounded-[5px] !h-[35px]`}
                options={{
                  style: {
                    base: {
                      fontSize: "15px",
                      lineHeight: 1.5,
                      color: "#444",
                    },
                    empty: {
                      color: "#3a120a",
                      backgroundColor: "transparent",
                      "::placeholder": {
                        color: "#444",
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="w-[50%] ">
              <label className="block pb-3 text-[black]">
                CVV <span className="text-red-500">*</span>{" "}
              </label>
              <CardCvcElement
                className="w-full border p-1 rounded-[5px] !h-[35px]"
                options={{
                  style: {
                    base: {
                      fontSize: "15px",
                      lineHeight: 1.5,
                      color: "#444",
                    },
                    empty: {
                      color: "#3a120a",
                      backgroundColor: "transparent",
                      "::placeholder": {
                        color: "#444",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className={`w-[150px]  h-[50px] my-3 flex items-center justify-center  cursor-pointer bg-[#56D2C4]  transition duration-300 mt-5 hover:bg-[#f63b60] text-[#fff]  rounded-[5px] text-[18px] font-[600]`}
          />
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
