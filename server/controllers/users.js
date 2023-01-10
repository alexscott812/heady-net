const User = require('../models/user');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const validateUUIDv4 = require('../utils/validate-uuid-v4');
const createError = require('../utils/create-error');

const getUsers = async (req, res, next) => {
  const sort = req.query.sort || 'first_name'; // Default: 'name'
  const sortField = (sort.substring(0,1) === '-') ? sort.substring(1) : sort;
  const sortOrder = (sort.substring(0,1) === '-') ? -1 : 1;
  const sortQuery = { [sortField]: sortOrder };
  const page = Math.max((parseInt(req.query.page) || 1), 1); // Default: 1, Min: 1
  const limit = Math.min((parseInt(req.query.limit) || 12), 1000); // Default: 12, Max: 1000
  const skip = (page - 1) * limit;

  const query = {};
  if (req.query.q) query.first_name = { $regex: req.query.q, $options: 'i' };

  try {
    const users = await User.aggregate([
      { $match: query },
      { $sort: sortQuery },
      {
        $facet: {
          meta: [
            { $count: 'total_results' },
            {
              $addFields: {
                current_page: page,
                results_limit: limit,
                total_pages: {
                  $ceil: {
                    $divide: [ '$total_results', limit ]
                  }
                }
              }
            }
          ],
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                '_id': 1,
                'role': 1,
                'first_name': 1,
                'last_name': 1,
                'created_at': 1,
                'updated_at': 1
              }
            }
          ]
        }
      },
      {
        $project: {
          data: '$data',
          meta: {
            $ifNull: [
              { $arrayElemAt: ['$meta', 0] },
              {
                total_results: 0,
                current_page: page,
                results_limit: limit,
                total_pages: 0
              }
            ]
          }
        }
      }
    ]);

    res.status(200).json(users[0]);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const getUserById = async (req, res, next) => {
  try {
    if (!validateUUIDv4(req.params.id)) {
      return next(createError(404, 'Invalid user ID'))
    }
    const user = await User.aggregate([
      {
        $match: { _id: req.params.id }
      },
      {
        $lookup: {
          from: 'reviews',
          let: { user_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: [ '$user_id', '$$user_id' ] }
              }
            }
          ],
          as: 'reviews'
        }
      },
      {
        $project: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          bio: 1,
          email: 1,
          review_count: { $size: '$reviews' },
          role: 1,
          created_at: 1,
          updated_at: 1
        }
      }
    ]);

    if (!user[0]) {
      return next(createError(404, `No user found with ID of ${req.params.id}`));
    }

    res.status(200).json(user[0]);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.aggregate([
      {
        $match: { _id: req.user._id }
      },
      {
        $lookup: {
          from: 'reviews',
          let: { user_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: [ '$user_id', '$$user_id' ] }
              }
            }
          ],
          as: 'reviews'
        }
      },
      {
        $project: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          bio: 1,
          email: 1,
          review_count: { $size: '$reviews' },
          role: 1,
          created_at: 1,
          updated_at: 1
        }
      }
    ]);

    if (!user[0]) {
      return next(createError(404, `No user found with ID of ${req.params.id}`));
    }

    res.status(200).json(user[0]);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const addUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).lean();
    if (existingUser) {
      return next(createError(400, `Email ${req.body.email} already exists`));
    }

    if (req.body.password !== req.body.confirm_password) {
      return next(createError(400, 'Passwords do not match'));
    }
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
      _id: validateUUIDv4(req.body._id) ? req.body._id : uuidv4(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      bio: req.body.bio,
      email: req.body.email,
      password: hashedPassword,
      role: 'user'
    });

    await user.save();

    const {
      password,
      password_reset_token,
      __v,
      ...passwordlessNewUser
    } = user;

    res.status(201).json(passwordlessNewUser);
  } catch (err) {
    return next(createError(400, err.message));
  }
};

const updateUserById = async (req, res, next) => {
  try {
    if (!validateUUIDv4(req.params.id)) {
      return next(createError(404, 'Invalid user ID'));
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!user) {
      return next(createError(404, `No user found with ID of ${req.params.id}`));
    }

    const {
      password,
      password_reset_token,
      __v,
      ...passwordlessUser
    } = user;

    res.status(200).json(passwordlessUser);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).json({ msg: `Deleted ${result.deletedCount} users` });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const deleteUserById =  async (req, res, next) => {
  try {
    if (!validateUUIDv4(req.params.id)) {
      return next(createError(404, 'Invalid user ID'));
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(createError(404, `No user found with ID of ${req.params.id}`));
    }
    if (user._id !== req.user._id) {
      return next(createError(403, `Not allowed to update user with ID of ${req.params.id}`));
    }
    res.status(200).json({ msg: `Deleted user with ID of ${req.params.id}` });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  addUser,
  updateUserById,
  deleteUsers,
  deleteUserById
};
