const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  addUser,
  updateUserById,
  deleteUsers,
  deleteUserById
} = require('../controllers/users');

const router = express.Router();

/**
 * @route   GET api/users
 * @desc    Get all users (paginated)
 * @access  Public
 */
router.get('/', getUsers);

/**
 * @route   GET api/users/me
 * @desc    Get current user
 * @access  Private
 */
 router.get('/me', authenticate, getCurrentUser);

/**
 * @route   GET api/users/:id
 * @desc    Get single user by ID
 * @access  Public
 */
router.get('/:id', getUserById);

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */
router.post('/', addUser);

/**
 * @route   PUT api/users/:id
 * @desc    Update user by ID
 * @access  Public
 */
router.put('/:id', updateUserById);

/**
 * @route   DELETE api/users
 * @desc    Delete all users
 * @access  Public
 */
router.delete('/', authenticate, authorize(['admin']), deleteUsers);

/**
 * @route   DELETE api/users/:id
 * @desc    Delete user by ID
 * @access  Public
 */
router.delete('/:id', deleteUserById);

module.exports = router;
