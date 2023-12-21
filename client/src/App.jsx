import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Movies from "./pages/Movies";
import CreateMoviePage from "./pages/Admin/CreateMoviePage";
import AllUserPage from "./pages/Admin/AllUserPage";
import DashBoardPage from "./pages/Admin/DashBoardPage";
import CreateScreenPage from "./pages/Admin/CreateScreenPage";
import AllMoviePage from "./pages/Admin/AllMoviePage";
import AllScreenPage from "./pages/Admin/AllScreenPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import AllReservationPage from "./pages/Admin/AllReservationPage";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import BookingPage from "./pages/BookingPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { server } from "./server";
import { useEffect, useState } from "react";
import TicketPage from "./pages/TicketPage";

function App() {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    try {
      const { data } = await axios.get(`${server}/payment/stripeapikey`);
      setStripeApiKey(data.stripeApikey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  }

  useEffect(() => {
    getStripeApikey();
  }, []);

  return (
    <>
      <BrowserRouter>
        {stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
              <Route
                path="/booking"
                element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MovieDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedAdminRoute>
                <DashBoardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/dashboard-create-movie"
            element={
              <ProtectedAdminRoute>
                <CreateMoviePage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/dashboard-create-screen"
            element={
              <ProtectedAdminRoute>
                <CreateScreenPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/dashboard-users"
            element={
              <ProtectedAdminRoute>
                <AllUserPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/dashboard-movies"
            element={
              <ProtectedAdminRoute>
                <AllMoviePage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/dashboard-screens"
            element={
              <ProtectedAdminRoute>
                <AllScreenPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/dashboard-reservations"
            element={
              <ProtectedAdminRoute>
                <AllReservationPage />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
