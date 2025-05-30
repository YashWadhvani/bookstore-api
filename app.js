const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', bookRoutes);

app.get('/', (req, res) => {
  res.send('Bookstore API is running');
});

module.exports = app;
