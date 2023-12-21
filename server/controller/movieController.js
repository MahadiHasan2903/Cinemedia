const Movie = require("../models/movie");
const cloudinary = require("cloudinary").v2;

// Create a new movie
const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      releaseDate,
      duration,
      genre,
      cast,
      ratings,
      poster,
      trailer,
    } = req.body;

    const existingMovie = await Movie.findOne({
      $or: [{ title }],
    });

    if (existingMovie) {
      return res.status(400).json({
        success: false,
        message: "A movie with the same title and release date already exists.",
      });
    } else {
      // Convert Base64 poster to Buffer
      const posterBuffer = Buffer.from(poster.split(",")[1], "base64");

      const myCloud = await cloudinary.uploader.upload(
        "data:image/png;base64," + posterBuffer.toString("base64"),
        {
          folder: "poster",
        }
      );
      const newMovie = new Movie({
        title,
        description,
        poster: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        releaseDate,
        duration,
        genre,
        ratings,
        cast,
        trailer,
      });

      await newMovie.save();

      res.status(201).json({
        success: true,
        message: "Movie Created Successfully",
      });
    }
  } catch (error) {
    console.error("Error creating movie:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching movies",
    });
  }
};

// Get movie by ID
const getSingleMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      movie,
    });
  } catch (error) {
    console.error("Error fetching movie:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching movie",
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    await Movie.findByIdAndDelete(movieId);

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting movie",
    });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getSingleMovie,
  deleteMovie,
};
