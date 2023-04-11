const express = require("express");
const { getHealth } = require("../controllers/healthz");

const router = express.Router();

/**
 * @route   GET api/healthz
 * @desc    Get server health
 * @access  Public
 */
router.get("/", getHealth);

module.exports = router;
