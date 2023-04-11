const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const {
  getShows,
  getShowById,
  getRandomShow,
  getPopularShows,
  addShow,
  updateShowById,
  deleteShows,
  deleteShowById,
} = require("../controllers/shows");

const router = express.Router();

/**
 * @route   GET api/shows
 * @desc    Get all shows (paginated)
 * @access  Public
 */
router.get("/", getShows);

/**
 * @route   GET api/shows/random
 * @desc    Get random show
 * @access  Public
 */
router.get("/random", getRandomShow);

/**
 * @route   GET api/shows/popular
 * @desc    Get popular shows
 * @access  Public
 */
router.get("/popular", getPopularShows);

/**
 * @route   GET api/shows/:id
 * @desc    Get single show by ID
 * @access  Public
 */
router.get("/:id", getShowById);

/**
 * @route   POST api/shows
 * @desc    Add new show
 * @access  Private
 */
router.post("/", authenticate, authorize(["admin"]), addShow);

/**
 * @route   PUT api/shows/:id
 * @desc    Update single show by id
 * @access  Private
 */
router.put("/:id", authenticate, authorize(["admin"]), updateShowById);

/**
 * @route   DELETE api/shows
 * @desc    Delete all shows
 * @access  Private
 */
router.delete("/", authenticate, authorize(["admin"]), deleteShows);

/**
 * @route   DELETE api/shows/:id
 * @desc    Delete single show by id
 * @access  Private
 */
router.delete("/:id", authenticate, authorize(["admin"]), deleteShowById);

module.exports = router;
