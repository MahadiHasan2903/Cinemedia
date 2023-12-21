import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../redux/action/movieAction";
import MovieCard from "../components/Moviecard/MovieCard";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";

const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
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
            <div>
              {movies && movies.length === 0 ? (
                <span className="w-full flex text-center  text-[#321575d2] justify-center items-center text-[30px] font-bold services_subtitle my-[200px]">
                  No Movies Found!
                </span>
              ) : (
                <>
                  <h5 className="w-full text-center mt-10 text-[#321575d2] 800px:text-[30px] font-bold services_subtitle">
                    All Movies
                  </h5>
                  <div className="flex items-start justify-center my-2">
                    <div className="w-11/12 mx-auto">
                      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12 ">
                        {movies?.map((movie) => (
                          <MovieCard key={movie._id} movie={movie} />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Movies;
