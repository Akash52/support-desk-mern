const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

//@des - To register a new user
//@route - api/users
//@access - Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Validate the data
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all fields');
  }
  //Check if user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(401);
    throw new Error('User already exists');
  }
  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  //Save user to database

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error('User not created');
  }
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

//@des - To get the current user
//@route - api/users/me
//@access - Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  };
  res.status(200).json(user);
});

//@des - To generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
