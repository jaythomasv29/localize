const jwt = require("jsonwebtoken");

/**
 * verify user credentials to allow access to routes
 */

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("You are not authenticated");
  // verify jwt
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not validl");
    req.user = user;

    // continue on with next middleware
    next();
  });
};

module.exports = { verifyToken };
