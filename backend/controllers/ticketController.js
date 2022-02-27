const asyncHandler = require('express-async-handler');
const ticketModel = require('../models/ticketModel');
const userModel = require('../models/userModel');

//@des - Get user tickets
//@route - api/tickets
//@access - Private

const getTickets = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  const tickets = await ticketModel.find({ user: req.user.id });
  res.status(200).json(tickets);
});

//@des - Create a new ticket
//@route - api/tickets
//@access - Private

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    return next(new ErrorResponse('Please provide all fields', 400));
  }

  const user = await userModel.findById(req.user.id);
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  const ticket = await ticketModel.create({
    user: req.user.id,
    product,
    description,
    status: 'new',
  });
  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  createTicket,
};
