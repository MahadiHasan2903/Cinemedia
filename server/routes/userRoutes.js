const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
} = require("../controller/userController");

// Create a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Logout user
router.get("/logout", logoutUser);

// Update an existing user by ID (requires authentication)
router.put("/users/:id", updateUser);

// Delete an existing user by ID (requires authentication)
router.delete("/users/:id", deleteUser);

// Get a single user by ID (requires authentication)
router.get("/users/:id", getSingleUser);

// Get all users (requires authentication and admin role)
router.get("/users", getAllUsers);

module.exports = router;
