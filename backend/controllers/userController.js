const asyncHandler = require('express-async-handler');

//@des - To register a new user
//@route - api/users
//@access - Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Validate the data
  if (!name || !email || !password) {
    //one way
    // return res.status(400).json({
    //   error: 'Please provide all fields',
    // });
    //2nd way
    res.status(400);
    throw new Error('Please provide all fields');
  }
  res.send('Register Route');
});

//@des - To login a user
//@route - api/users
//@access - Private
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login Route');
});

module.exports = {
  registerUser,
  loginUser,
};
