import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMovies } from "../redux/action/movieAction";
import { getAllScreens } from "../redux/action/screenAction";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import Loader from "../components/Loader/Loader";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [screens, setScreens] = useState([]);
  const movies = useSelector((state) => state.movies.movies);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const screensData = useSelector((state) => state.screens.screens);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAllMovies()); // Fetch movies data
    dispatch(getAllScreens()); // Fetch screens data
  }, [dispatch]); // Run this effect once when the component mounts

  useEffect(() => {
    const selectedMovie = movies.find((i) => i._id === id);
    setMovie(selectedMovie);
  }, [movies, id]);

  useEffect(() => {
    setScreens(
      screensData.filter((screen) => screen.name === movie?.title) // Change name to title
    );
  }, [screensData, movie]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Header />
            {movie && <MovieDetails movie={movie} screens={screens} />}{" "}
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
