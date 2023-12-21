const express = require("express");
const router = express.Router();
const { upload } = require("../multer");

const {
  createMovie,
  getAllMovies,
  getSingleMovie,
  deleteMovie,
} = require("../controller/movieController");

router.post("/create-movie", upload, createMovie);

router.get("/get-all-movies", getAllMovies);
router.get("/get-movie/:id", getSingleMovie);
router.delete("/delete-movie/:id", deleteMovie);

module.exports = router;
