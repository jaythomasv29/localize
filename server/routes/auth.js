const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const User = require("../models/User");
const { createError } = require("../utils/createError");

// User Registration
router.post("/register", async (req, res, next) => {
  const { username, email } = req.body;

  try {
    // Check if username or email exists in system already
    const foundUser = await User.find({
      $or: [{username}, {email}]
    })
    if(!foundUser) return next(createError(401, "Email or username already exists..."))
    
    const saltRounds = 10;
    const password = await bcrypt.hash(req.body.password, saltRounds);
    // create new user
    const user = new User({ username, email, password });
    
    // save user
    const savedUser = await user.save();

    // Generate JSONWEBTOKEN to pass through cookies
    const token = jwt.sign(
      {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
      process.env.JWT_SECRET
    );

    // Pass JWT through cookies
    res.cookie("access_token", token, { httpOnly: true });

    // send response with JWT in ccookies & saved user info

    return res.status(200).json("Successful Registration w Token");
  } catch (err) {
     next(createError(400, err));
  }
});

// User Login
router.post("/login", async (req, res, next) => {
  try {
    // Validate if User exists in DB
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) next(createError(400, "Wrong username or password"))

    // Validate User Password
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) return next(createError(403, "Wrong username or password"));

    // Create token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    // Pass JWT through cookies
    res.cookie("access_token", token, { httpOnly: true });

    // send response with JWT in ccookies & saved user info

    return res.status(200).json(user);
  } catch (err) {
    next(err)
  }
});

module.exports = router;
