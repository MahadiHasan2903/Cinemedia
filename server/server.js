const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const path = require("path");
const user = require("./routes/userRoutes");
const movie = require("./routes/movieRoutes");
const screen = require("./routes/screenRoutes");
const reservation = require("./routes/reservationRoutes");
const payment = require("./controller/PaymentController");

dotenv.config();

connectDB();

const app = express();

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://cinemedia-client.vercel.app",
    // origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "./uploads")));

// Routes
app.use("/api/v1/user", user);
app.use("/api/v1/movie", movie);
app.use("/api/v1/screen", screen);
app.use("/api/v1/reservation", reservation);
app.use("/api/v1/payment", payment);

app.get("/", (req, res) => {
  res.send("Hello world from backend server!");
});
// Server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan
      .white
  );
});
