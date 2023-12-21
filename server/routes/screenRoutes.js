const express = require("express");
const router = express.Router();
const {
  createScreen,
  getAllScreens,
  getSingleScreen,
  deleteScreen,
} = require("../controller/screenController");

router.post("/create-screen", createScreen);
router.get("/get-all-screen", getAllScreens);
router.get("/get-screen/:id", getSingleScreen);
router.delete("/delete-screen/:id", deleteScreen);

module.exports = router;
