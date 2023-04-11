const express = require('express');
const authenticate = require('../middleware/authenticate');
const {
	login,
	refreshToken,
	logout,
	forgotPassword,
	resetPassword,
	changePassword
} = require('../controllers/auth');

const router = express.Router();

/**
 * @route   POST api/auth/login
 * @desc    Login
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   POST api/auth//refresh-token
 * @desc    Refresh Token
 * @access  Public
 */
router.post('/refresh-token', refreshToken);

/**
 * @route   POST api/auth/logout
 * @desc    Logout
 * @access  Public
 */
router.post('/logout', logout);

/**
 * @route   POST api/auth/forgot-password
 * @desc    Forgot Password
 * @access  Public
 */
router.post('/forgot-password', forgotPassword);

/**
 * @route   POST api/auth/reset-passsword
 * @desc    Reset Password
 * @access  Public
 */
router.post('/reset-password', resetPassword);

/**
 * @route   POST api/auth/change-passsword
 * @desc    Change Password
 * @access  Public
 */
router.post('/change-password', authenticate, changePassword);

module.exports = router;
