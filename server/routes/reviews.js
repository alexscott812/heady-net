const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const {
  getReviews,
  getReviewById,
  addReview,
  updateReviewById,
  deleteReviews,
  deleteReviewById
} = require('../controllers/reviews');

const router = express.Router();

/**
 * @route   GET api/reviews
 * @desc    Get all reviews (paginated)
 * @access  Public
 */
router.get('/', getReviews);

/**
 * @route   GET api/reviews/:id
 * @desc    Get single review by ID
 * @access  Public
 */
router.get('/:id', getReviewById);

/**
 * @route   POST api/reviews
 * @desc    Add new reviews
 * @access  Private
 */
router.post('/', authenticate, addReview);

/**
 * @route   PUT api/reviews/:id
 * @desc    Update single review by id
 * @access  Private
 */
router.put('/:id', authenticate, updateReviewById);

/**
 * @route   DELETE api/reviews
 * @desc    Delete all reviews
 * @access  Private
 */
router.delete('/', authenticate, authorize(['admin']), deleteReviews);

/**
 * @route   DELETE api/reviews/:id
 * @desc    Delete single review by id
 * @access  Private
 */
router.delete('/:id', authenticate, deleteReviewById);

module.exports = router;
