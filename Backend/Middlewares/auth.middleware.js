const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticateJWT = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        status: false,
        msg: "Unautorized Access Not Permitted!",
      });
    }
  }
};

module.exports = { authenticateJWT };
