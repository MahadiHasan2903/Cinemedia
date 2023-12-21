import React, { useState } from "react";
import { BsFillBookmarksFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";

const MovieDetails = ({ movie, screens }) => {
  const navigate = useNavigate();

  const groupedScreens = screens.reduce((groups, screen) => {
    const key = `${screen.theaterName}_${
      screen.screenDate
    }_${screen.showtimes.join("-")}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(screen);
    return groups;
  }, {});

  const [selectedShowtimes, setSelectedShowtimes] = useState(
    Object.keys(groupedScreens).map(() => "")
  );

  const handleShowtimeChange = (groupIndex, event) => {
    const newSelectedShowtimes = [...selectedShowtimes];
    newSelectedShowtimes[groupIndex] = event.target.value;
    setSelectedShowtimes(newSelectedShowtimes);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleBookNow = (groupIndex) => {
    const selectedScreenGroup = Object.entries(groupedScreens)[groupIndex];
    const selectedScreen = selectedScreenGroup[1][0]; // First screen in the group
    const selectedShowtime = selectedShowtimes[groupIndex];

    if (!selectedShowtime) {
      toast.error("Please select a showtime first");
    } else {
      navigate("/booking", {
        state: {
          movieName: movie.title,
          theaterName: selectedScreen.theaterName,
          showDate: formatDate(selectedScreen.screenDate),
          selectedShowtime: selectedShowtime,
          ticketPrice: selectedScreen.ticketPrice,
          movie: movie,
          screens: screens,
        },
      });
    }
  };

  return (
    <div className="bg-white">
      {movie ? (
        <div className="mx-auto w-[90%] 800px:w-[80%]">
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%] ">
                <img src={movie?.poster.url} alt="" className="w-[80%]" />
                <h1 className="text-[23px]  font-[600] font-Roboto text-[#321575d2] my-5">
                  <span className=" font-bold !text-[#321575d2]">Title: </span>
                  {movie.title}
                </h1>
                <p className="!text-[#333] py-2">
                  {" "}
                  <span className=" font-bold !text-[#321575d2]">
                    Description :{" "}
                  </span>
                  {movie.description}
                </p>
                <p className="!text-[#333] py-2">
                  <span className=" font-bold !text-[#321575d2]">
                    Duration :{" "}
                  </span>
                  {movie.duration}
                </p>
                <h5 className="py-2 text-[15px] !text-[#333] flex">
                  <span className=" font-bold !text-[#321575d2]">
                    IMDB rating :{" "}
                  </span>
                  ({movie.ratings}/10){" "}
                  <AiFillStar className="text-[#ffde4b] mt-1 ml-1" />
                </h5>
                <Link to={`${movie.trailer}`}>
                  <p className=" pt-5 font-bold text-[22px] text-[#9e4545] font-Roboto">
                    Watch Trailer
                  </p>
                </Link>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 ml-5">
                <p className="text-[#333] text-[35px] text-center">
                  <u>Available Shows</u>
                </p>
                <div className="items-center pt-4 ">
                  {screens.length === 0 ? (
                    <h1 className="text-[30px] text-[#321575d2] my-3 flex justify-center items-center">
                      This movie is not currently available
                    </h1>
                  ) : (
                    <>
                      {Object.entries(groupedScreens).map(
                        ([groupKey, groupScreens], groupIndex) => (
                          <div key={groupIndex} className="pr-8">
                            <h2 className="pt-3 text-[25px] text-[#321575d2] pb-3 ">
                              Theater Name: {groupScreens[0].theaterName}
                            </h2>

                            <div className="font-bold text-[15px] text-[#333] font-Roboto">
                              <h2 className="text-[#321575d2]">
                                Available Showtimes:
                              </h2>
                              <h2 className="my-3">
                                Show Date:{" "}
                                {formatDate(groupScreens[0].screenDate)}
                              </h2>

                              <select
                                value={selectedShowtimes[groupIndex]}
                                onChange={(e) =>
                                  handleShowtimeChange(groupIndex, e)
                                }
                                className="w-full mt-2 border h-[35px] rounded-[5px] cursor-pointer"
                              >
                                <option value="">Select Showtime</option>
                                {groupScreens[0].showtimes.map((showtime) => (
                                  <option key={showtime} value={showtime}>
                                    {showtime}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="flex py-2">
                              <h4 className="font-bold text-[16px] text-[#333] font-Roboto">
                                <span className=" font-bold !text-[#333]">
                                  Ticket Price :{" "}
                                </span>
                                {groupScreens[0].ticketPrice} BDT
                              </h4>
                            </div>
                            <button
                              className="w-[150px] bg-black my-3 justify-center cursor-pointer hover:bg-[#56D2C4] !hover:text-[#000000] transition duration-300 !mt-6 !rounded !h-11 flex items-center"
                              onClick={() => handleBookNow(groupIndex)}
                            >
                              <span className="flex items-center text-white">
                                Book Now{" "}
                                <BsFillBookmarksFill className="ml-1" />
                              </span>
                            </button>
                          </div>
                        )
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieDetails;
