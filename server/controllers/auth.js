const User = require('../models/user');
const Token = require('../models/token');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const validateUUIDv4 = require('../utils/validate-uuid-v4');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verify-token');
const generateAccessToken = require('../utils/generate-access-token');
const generateRefreshToken = require('../utils/generate-refresh-token');
const generatePasswordResetToken = require('../utils/generate-password-reset-token');
const createError = require('../utils/create-error');

const login = async (req, res, next) => {
  try {
    // const user = await User.findOne({ email: req.body.email }).lean();
    const user = await User.findOne({ username: req.body.username }).lean();
    if (!user) {
      return next(
        // createError(400, `No user found with email ${req.body.email}`)
        createError(400, `No user found with username ${req.body.username}`)
      );
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return next(createError(400, 'Invalid Credentials'));
    }

    // const { _id, first_name, last_name, role } = user;
    // const accessToken = generateAccessToken({
    //   _id,
    //   first_name,
    //   last_name,
    //   role,
    // });
    const { _id, username, role } = user;
    const accessToken = generateAccessToken({
      _id,
      username,
      role
    });
    const refreshToken = generateRefreshToken();

    const token = new Token({
      _id: uuidv4(),
      user_id: _id,
      token: refreshToken
    });
    await token.save();

    res
      .status(201)
      .cookie('refresh_token', refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined
      })
      .json({
        token_type: 'bearer',
        access_token: accessToken,
        refresh_token: refreshToken
      });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const tokenCookie = req.cookies.refresh_token;
    if (!tokenCookie) {
      return next(createError(400, 'No token provided'));
    }
    const token = await Token.findOne({ token: tokenCookie }).lean();
    if (!token) {
      return next(createError(400, `Token ${tokenCookie} not found`));
    }
    const user = await User.findOne({ _id: token.user_id }).lean();
    if (!user) {
      return next(
        createError(400, `No user associated with token ${tokenCookie}`)
      );
    }

    // const { _id, first_name, last_name, role } = user;
    // const accessToken = generateAccessToken({
    //   _id,
    //   first_name,
    //   last_name,
    //   role,
    // });
    const { _id, username, role } = user;
    const accessToken = generateAccessToken({
      _id,
      username,
      role
    });
    const refreshToken = generateRefreshToken();
    await Token.findByIdAndUpdate(
      token._id,
      { token: refreshToken },
      { new: true }
    );

    res
      .status(200)
      .cookie('refresh_token', refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined
      })
      .json({
        token_type: 'bearer',
        access_token: accessToken,
        refresh_token: refreshToken
      });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const logout = async (req, res, next) => {
  try {
    const tokenCookie = req.cookies.refresh_token;
    if (!tokenCookie) {
      return next(createError(400, 'Please provide a token to delete'));
    }
    const deletedToken = await Token.findOneAndDelete({ token: tokenCookie });
    if (!deletedToken) {
      return next(createError(404, `Token ${tokenCookie} not found`));
    }
    res.clearCookie('refresh_token');
    res.status(200).json({ msg: `Deleted token ${tokenCookie}` });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    // const user = await User.findOne({ email: req.body.email });
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(
        // createError(400, `No user found with email ${req.body.email}`)
        createError(400, `No user found with username ${req.body.username}`)
      );
    }

    const passwordResetToken = generatePasswordResetToken();
    user.password_reset_token = passwordResetToken;
    await user.save();

    console.log(`sending email to: ${user.email}`);
    console.log(`password reset token: ${passwordResetToken}`);

    //res.status(200).json({ msg: `Password reset email sent to ${user.email}` });
    res
      .status(200)
      .json({ msg: 'Password reset functionality not yet available' });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      return next(createError(400, 'No token provided'));
    }

    const user = await User.findOne({ password_reset_token: token });
    if (!user) {
      return next(
        createError(400, `No user found with password reset token ${token}`)
      );
    }

    const newPasswordMatch =
      req.body.new_password === req.body.confirm_new_password;
    if (!newPasswordMatch) {
      return next(createError(400, 'New passwords do not match'));
    }

    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.new_password, saltRounds);

    user.password = hashedPassword;
    user.password_reset_token = null;
    await user.save();

    res.status(200).json({ msg: 'Password has been reset' });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const changePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return next(createError(400, `No user found with ID of ${req.user._id}`));
    }

    const passwordMatch = await bcrypt.compare(
      req.body.old_password,
      user.password
    );
    if (!passwordMatch) {
      return next(createError(400, 'Invalid Credentials'));
    }

    const newPasswordMatch =
      req.body.new_password === req.body.confirm_new_password;
    if (!newPasswordMatch) {
      return next(createError(400, 'New passwords do not match'));
    }

    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.new_password, saltRounds);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: 'Password has been changed' });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

module.exports = {
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  changePassword
};
