const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const {
	getSongs,
	getSongById,
	addSong,
	updateSongById,
	deleteSongs,
	deleteSongById
} = require('../controllers/songs');

const router = express.Router();

/**
 * @route   GET api/songs
 * @desc    Get all songs (paginated)
 * @access  Public
 */
router.get('/', getSongs);

/**
 * @route   GET api/shows/:id
 * @desc    Get single show by ID
 * @access  Public
 */
router.get('/:id', getSongById);

/**
 * @route   POST api/shows
 * @desc    Add new show
 * @access  Private
 */
router.post('/', authenticate, authorize(['admin']), addSong);

/**
 * @route   PUT api/shows/:id
 * @desc    Update single show by id
 * @access  Private
 */
router.put('/:id', authenticate, authorize(['admin']), updateSongById);

/**
 * @route   DELETE api/shows
 * @desc    Delete all shows
 * @access  Private
 */
router.delete('/', authenticate, authorize(['admin']), deleteSongs);

/**
 * @route   DELETE api/shows/:id
 * @desc    Delete single show by id
 * @access  Private
 */
router.delete('/:id', authenticate, authorize(['admin']), deleteSongById);

module.exports = router;
