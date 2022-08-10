require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./utils/db');
const errorLogger = require('./middleware/errorLogger');
const errorHandler = require('./middleware/errorHandler');
// const logger = require('./middleware/logger');
const logger = require('morgan');

const PORT = process.env.PORT || 5000;

// OPTIONS & MIDDLEWARE
app.use(cookieParser());
// app.use(cors({ origin: 'http://192.168.1.42:3000', credentials: true }));
app.use(logger(':method :url :status - :response-time ms'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/shows', require('./routes/shows'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/songs', require('./routes/songs'));
app.use('/api/venues', require('./routes/venues'));

// ERROR HANDLING
app.use(errorLogger);
app.use(errorHandler);

// STATIC ASSETS
if (process.env.NODE_ENV !== 'DEV') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// START LISTENING
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`);
});
//app.use(express.static('public'));