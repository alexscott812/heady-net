const mongoose = require('mongoose');
const createError = require('../utils/create-error');

const getHealth = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    res.status(200).json({
      uptime: process.uptime(),
      timestamp: Date.now()
    });
  } catch (err) {
    return next(createError(503, err.message));
  }
};

module.exports = {
  getHealth
};
