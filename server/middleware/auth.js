const User = require("../models/user");
const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const isAdmin = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
};
