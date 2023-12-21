import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import SlideShow from "../components/Slidshow/SlidShow";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../redux/action/movieAction";
import MovieCard from "../components/Moviecard/MovieCard";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.movies.isLoading);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Header />
            <SlideShow />
            <HomeComponent />
          </div>
          <div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

const HomeComponent = () => {
  const movies = useSelector((state) => state.movies.movies);
  const [visibleMovies, setVisibleMovies] = useState(4);

  const handleViewMore = () => {
    setVisibleMovies(visibleMovies + 4);
  };

  return (
    <div style={{ flex: 1 }}>
      {movies && movies.length === 0 ? (
        <span className="w-full flex text-center text-[#321575d2] justify-center items-center text-[30px] font-bold services_subtitle my-[200px]">
          No Movies Found!
        </span>
      ) : (
        <>
          <h5 className="w-full text-center mt-10 text-[#321575d2] 800px:text-[30px] font-bold services_subtitle">
            Now Showing
          </h5>
          <div className="flex items-start justify-center my-2">
            <div className="w-11/12 mx-auto">
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12 ">
                {movies?.slice(0, visibleMovies).map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
              {visibleMovies < movies.length && (
                <Link to="/movies">
                  <divc className="flex items-center justify-center ">
                    <button
                      onClick={handleViewMore}
                      className="w-[50%] 800px:w-[20%] bg-[#321575d2] text-white py-2 rounded-md"
                    >
                      View All
                    </button>
                  </divc>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
