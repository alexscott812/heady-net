const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const {
  getVenues,
  getVenueById,
  addVenue,
  updateVenueById,
  deleteVenues,
  deleteVenueById
} = require('../controllers/venues');

const router = express.Router();

/**
 * @route   GET api/venues
 * @desc    Get all venues (paginated)
 * @access  Public
 */
router.get('/', getVenues);

/**
 * @route   GET api/venues/:id
 * @desc    Get single venue by ID
 * @access  Public
 */
router.get('/:id', getVenueById);

/**
 * @route   POST api/venues
 * @desc    Add new venue
 * @access  Private
 */
router.post('/', authenticate, authorize(['admin']), addVenue);

/**
 * @route   PUT api/venues/:id
 * @desc    Update single venue by id
 * @access  Private
 */
router.put('/:id', authenticate, authorize(['admin']), updateVenueById);

/**
 * @route   DELETE api/venues
 * @desc    Delete all venues
 * @access  Private
 */
router.delete('/', authenticate, authorize(['admin']), deleteVenues);

/**
 * @route   DELETE api/venues/:id
 * @desc    Delete single venue by id
 * @access  Private
 */
router.delete('/:id', authenticate, authorize(['admin']), deleteVenueById);

module.exports = router;
