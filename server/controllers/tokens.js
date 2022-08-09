const User = require('../models/user');
const Token = require('../models/token');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const validateUUIDv4 = require('../utils/validate-uuid-v4');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verify-token');
const generateAccessToken = require('../utils/generate-access-token');
const generateRefreshToken = require('../utils/generate-refresh-token');

const addToken = async (req, res) => {
  try {
    const grantType = req.body.grant_type;

    switch (grantType) {
      case 'password': {
        const user = await User.findOne({ email: req.body.email }).lean();
        if (!user) {
          return res.status(400).json({ msg: `No user found with email ${req.body.email}` })
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
          return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const { password, ...passwordlessUser } = user;

        const accessToken = getAccessToken(passwordlessUser);
        const refreshToken = getRefreshToken(passwordlessUser);

        const token = new Token({
          _id: uuidv4(),
          user_id: passwordlessUser._id,
          token: refreshToken
        });

        const newToken = await token.save();

        res.status(201).json({
          user_id: passwordlessUser._id,
          token_type: 'bearer',
          access_token: accessToken,
          refresh_token: refreshToken
        });
        break;
      }
      case 'refresh_token': {
        const token = await Token.findOne({ token: req.body.token }).lean();
        if (!token) {
          return res.status(400).json({ msg: `Token ${req.body.token} not found` })
        }

        if (!verifyToken(token.token)) {
          return res.status(400).json({ msg: 'Invalid Token' })
        }
        const { user } = jwt.verify(token.token, process.env.JWT_SECRET);

        const accessToken = getAccessToken(user);
        const refreshToken = getRefreshToken(user);

        const updatedToken = await Token.findByIdAndUpdate(
          token._id,
          { token: refreshToken },
          { new: true }
        );

        res.status(201).json({
          user_id: user._id,
          token_type: 'bearer',
          access_token: accessToken,
          refresh_token: refreshToken
        });
        break;
      }
      default: {
        return res.status(400).json({ msg: 'Please provide a valid grant_type' })
      }
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteToken =  async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(400).json({ msg: 'Please provide a token to delete' })
    }
    const deletedToken = await Token.findOneAndDelete({ token: token });
    if (!deletedToken) {
      return res.status(404).json({ msg: `Token ${token} not found` })
    }
    res.status(200).json({ msg: `Deleted token ${token}` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const login =  async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    if (!user) {
      return res.status(400).json({ msg: `No user found with email ${req.body.email}` })
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const { password, ...passwordlessUser } = user;

    const accessToken = getAccessToken(passwordlessUser);
    const refreshToken = getRefreshToken(passwordlessUser);

    const token = new Token({
      _id: uuidv4(),
      user_id: passwordlessUser._id,
      token: refreshToken
    });

    const newToken = await token.save();

    res.cookie('refreshToken', refreshToken, {
      maxAge: (24 * 60 * 60),
      httpOnly: true,
      secure: !process.env.NODE_ENV === 'dev'
    });
    res.status(201).json({
      token_type: 'bearer',
      access_token: accessToken
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const refreshToken =  async (req, res) => {
  try {
    const tokenCookie = req.cookies.refreshToken;
    const token = await Token.findOne({ token: tokenCookie }).lean();
    if (!token) {
      return res.status(400).json({ msg: `Token ${tokenCookie} not found` })
    }
    if (!verifyToken(token.token)) {
      return res.status(400).json({ msg: 'Invalid Token' })
    }
    const { user } = jwt.verify(token.token, process.env.JWT_SECRET);

    const accessToken = getAccessToken(user);
    const refreshToken = getRefreshToken(user);

    const updatedToken = await Token.findByIdAndUpdate(
      token._id,
      { token: refreshToken },
      { new: true }
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: (24 * 60 * 60),
      httpOnly: true,
      secure: !process.env.NODE_ENV === 'dev'
    });
    res.status(200).json({ token: accessToken });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  addToken,
  deleteToken,
  refreshToken,
  login
};
