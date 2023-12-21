import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createMovie } from "../../redux/action/movieAction";

const movieGenres = [
  "Action",
  "Adventure",
  "Spy",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
];

const CreateMovie = () => {
  const dispatch = useDispatch();
  const [poster, setPoster] = useState(null);
  const [duration, setDuration] = useState("");
  const [name, setName] = useState("");
  const [trailer, setTrailer] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState("");
  const [cast, setCast] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPoster(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", name);
    formData.append("trailer", trailer);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("genre", category);
    formData.append("cast", cast);
    formData.append("releaseDate", releaseDate);
    formData.append("poster", poster);
    formData.append("ratings", ratings);

    try {
      const response = await dispatch(createMovie(formData));

      if (response.status === 201) {
        toast.success("Movie Created Successfully");

        setName("");
        setTrailer("");
        setDescription("");
        setDuration("");
        setCategory("");
        setCast("");
        setRatings("");
        setReleaseDate("");
        setPoster(null);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error creating movie. Please try again later.");
    }
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center text-black">
        Create Movie
      </h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2 text-black">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter movie title..."
          />
        </div>
        <br />

        <div>
          <label className="pb-2 text-black ">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 bg-white text-black appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter movie description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2 text-black">
            Trailer <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={trailer}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTrailer(e.target.value)}
            placeholder="Enter movie trailer..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2 text-black">
            Duration (hour) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="duration"
            value={duration}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration of movie in hour..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2 text-black">
            Ratings <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="duration"
            value={ratings}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setRatings(e.target.value)}
            placeholder="Enter imdb ratings of the movie..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2 text-black">
            Genre <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px] cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose Genre</option>
            {movieGenres &&
              movieGenres.map((i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2 text-black">Cast</label>
          <input
            type="text"
            name="tags"
            value={cast}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setCast(e.target.value)}
            placeholder="Enter movie cast..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2 text-black">
            Movie Release date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="releaseDate"
            id="start-date"
            value={releaseDate}
            className="mt-2 text-black appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>

        <br />
        <div>
          <label className="pb-2 text-black">
            Poster <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="poster"
            id="poster-input"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileInputChange}
            className="sr-only"
          />

          <div className="flex flex-wrap items-center w-full">
            <label htmlFor="poster-input">
              <AiOutlinePlusCircle
                size={30}
                className="mt-3 cursor-pointer"
                color="#555"
              />
            </label>
            {poster && (
              <img
                src={
                  poster instanceof File ? URL.createObjectURL(poster) : poster
                }
                alt="poster"
                className="h-[120px] w-[120px] object-cover m-2"
              />
            )}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMovie;
