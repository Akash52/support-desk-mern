const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
  res.status(201).json({ message: 'Welcome to Support Desk!' });
});

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} mode is ${process.env.NODE_ENV}`
  );
});
