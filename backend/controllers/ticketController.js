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

//@desc - Get a ticket by id
//@route - api/tickets/:id
//@access - Private

const getTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await ticketModel.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  res.status(200).json(ticket);
});

//@desc - delete a ticket by id
//@route - api/tickets/:id
//@access - Private

const deleteTicket = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await ticketModel.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

//@desc - Get a ticket by id
//@route - api/tickets/:id
//@access - Private

const updateTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await ticketModel.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const updatedTicket = await ticketModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
