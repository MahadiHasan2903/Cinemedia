const Screen = require("../models/screen");
const Movie = require("../models/movie");

//create screen

const createScreen = async (req, res) => {
  try {
    const {
      name,
      showtimes,
      hall,
      theaterName,
      ticketPrice,
      seats,
      screenDate,
    } = req.body;

    // Check if the movie title exists in the Movie collection
    const movie = await Movie.findOne({ title: name });
    if (!movie) {
      return res.status(400).json({ error: "No such movie is available" });
    } else {
      // Check if any showtime from the array matches an existing screen's showtime
      const existingScreen = await Screen.findOne({
        showtimes: { $in: showtimes },
        screenDate: screenDate,
        theaterName: theaterName,
        hall: hall,
      });

      if (existingScreen) {
        const conflictingShowtimes = existingScreen.showtimes.filter(
          (existingShowtime) => showtimes.includes(existingShowtime)
        );

        if (conflictingShowtimes.length > 0) {
          return res.status(400).json({
            error: `Conflicting showtime(s): ${conflictingShowtimes.join(
              ", "
            )}`,
          });
        }
      }
      // Create a new screen document
      const newScreen = new Screen({
        name,
        showtimes,
        theaterName,
        ticketPrice,
        seats,
        screenDate,
        hall,
      });

      const createdScreen = await newScreen.save();

      res.status(201).json(createdScreen);
    }
  } catch (error) {
    console.error("Error creating screen:", error);
    res.status(500).json({ error: "Error creating screen" });
  }
};

//delete screen
const deleteScreen = async (req, res) => {
  try {
    const screenId = req.params.id;

    // Find and delete the screen by ID
    const deletedScreen = await Screen.findByIdAndDelete(screenId);

    if (!deletedScreen) {
      return res.status(404).json({ error: "Screen not found" });
    }

    res.status(200).json({ message: "Screen deleted successfully" });
  } catch (error) {
    console.error("Error deleting screen:", error);
    res.status(500).json({ error: "Error deleting screen" });
  }
};

//get all screen
const getAllScreens = async (req, res) => {
  try {
    const screens = await Screen.find();
    res.status(200).json(screens);
  } catch (error) {
    console.error("Error fetching screens:", error);
    res.status(500).json({ error: "Error fetching screens" });
  }
};

//get single screen by id
const getSingleScreen = async (req, res) => {
  try {
    const screenId = req.params.id;

    const screen = await Screen.findById(screenId);

    if (!screen) {
      return res.status(404).json({ error: "Screen not found" });
    }

    res.status(200).json(screen);
  } catch (error) {
    console.error("Error fetching screen:", error);
    res.status(500).json({ error: "Error fetching screen" });
  }
};

module.exports = {
  createScreen,
  deleteScreen,
  getAllScreens,
  getSingleScreen,
};
