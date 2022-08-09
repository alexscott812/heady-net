const express = require('express');
const logger = require('../middleware/logger');
const {
  addToken,
  deleteToken,
  refreshToken,
  login
} = require('../controllers/tokens');
const router = express.Router();
router.use(logger);

// @route   POST api/tokens
// @desc    Register new user
// @access  Public
router.post('/', addToken);

// @route   DELETE api/tokens
// @desc    Delete all users
// @access  Public

// router.delete('/', async (req,res) => {
//   try {
//     const result = await User.deleteMany({});
//
//     res.status(200).json({ msg: `Deleted ${result.deletedCount} users`});
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// @route   DELETE api/tokens
// @desc    Delete token
// @access  Public
router.delete('/', deleteToken);

router.post('/refresh', refreshToken);
router.post('/login', login);


module.exports = router;
