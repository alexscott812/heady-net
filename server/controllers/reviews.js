const Review = require("../models/review");
const Show = require("../models/show");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const validateUUIDv4 = require("../utils/validate-uuid-v4");
const createError = require("../utils/create-error");

// const getReviews = async (req, res, next) => {
//   const sort = req.query.sort || 'name'; // Default: 'name'
//   const sortField = (sort.substring(0,1) === '-') ? sort.substring(1) : sort;
//   const sortOrder = (sort.substring(0,1) === '-') ? -1 : 1;
//   const sortTest = { [sortField]: sortOrder };
//   const page = Math.max((parseInt(req.query.page) || 1), 1); // Default: 1, Min: 1
//   const limit = Math.min((parseInt(req.query.limit) || 6), 10); // Default: 4, Max: 10
//   const skip = (page - 1) * limit;

//   const query = {};
//   if (req.query.user_id) query['user_id'] = req.query.user_id;
//   if (req.query.show_id) query['show_id'] = req.query.show_id;

//   try {
//     const count = await Review.countDocuments(query);
//     const pages = Math.ceil(count / limit);
//     const reviews = await Review.aggregate([
//       { $match: query },
//       { $sort: sortTest },
//       { $skip: skip },
//       { $limit: limit },
//       {
//         $lookup: {
//           from: 'shows',
//           let: { show_id: '$show_id' },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $eq: [ '$_id', '$$show_id' ]
//                 }
//               }
//             },
//             {
//               $project: {
//                 '_id': 1,
//                 'city': 1,
//                 'country': 1,
//                 'day': 1,
//                 'date': 1,
//                 'month': 1,
//                 'state': 1,
//                 'title': 1,
//                 'venue': 1,
//                 'year': 1,
//                 'image': {
//                   $arrayElemAt: [ '$images', 0 ]
//                 }
//               }
//             }
//           ],
//           as: 'shows'
//         }
//       },
//       {
//         $lookup: {
//           from: 'users',
//           let: { user_id: '$user_id' },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $eq: [ '$_id', '$$user_id' ]
//                 }
//               }
//             },
//             {
//               $project: {
//                 '_id': 1,
//                 'first_name': 1,
//                 'last_name': 1
//               }
//             }
//           ],
//           as: 'users'
//         }
//       },
//       {
//         $project: {
//           '_id': 1,
//           'text': 1,
//           'rating': 1,
//           'created_at': 1,
//           'updated_at': 1,
//           'user': {
//             $arrayElemAt: [ '$users', 0 ]
//           },
//           'show': {
//             $arrayElemAt: [ '$shows', 0 ]
//           }
//         }
//       }
//     ]);

//     let results = {
//       meta: {
//         total_results: count,
//         results_limit: limit,
//         current_page: page,
//         total_pages: pages
//       },
//       data: reviews
//     };

//     res.status(200).json(results);
//   } catch (err) {
//     return next(createError(500, err.message));
//   }
// };

const getReviews = async (req, res, next) => {
  const sort = req.query.sort || "date"; // Default: 'name'
  const sortField = sort.substring(0, 1) === "-" ? sort.substring(1) : sort;
  const sortOrder = sort.substring(0, 1) === "-" ? -1 : 1;
  const sortQuery = { [sortField]: sortOrder };
  const page = Math.max(parseInt(req.query.page) || 1, 1); // Default: 1, Min: 1
  const limit = Math.min(parseInt(req.query.limit) || 6, 20); // Default: 6, Max: 20
  const skip = (page - 1) * limit;

  const query = {};
  if (req.query.user_id) query["user_id"] = req.query.user_id;
  if (req.query.show_id) query["show_id"] = req.query.show_id;

  try {
    const reviews = await Review.aggregate([
      { $match: query },
      { $sort: sortQuery },
      {
        $facet: {
          meta: [
            { $count: "total_results" },
            {
              $addFields: {
                current_page: page,
                results_limit: limit,
                total_pages: {
                  $ceil: {
                    $divide: ["$total_results", limit],
                  },
                },
              },
            },
          ],
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: "shows",
                let: { show_id: "$show_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$show_id"],
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      city: 1,
                      country: 1,
                      day: 1,
                      date: 1,
                      month: 1,
                      state: 1,
                      title: 1,
                      venue: 1,
                      year: 1,
                      image: {
                        $arrayElemAt: ["$images", 0],
                      },
                    },
                  },
                ],
                as: "shows",
              },
            },
            {
              $lookup: {
                from: "users",
                let: { user_id: "$user_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$user_id"],
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      first_name: 1,
                      last_name: 1,
                    },
                  },
                ],
                as: "users",
              },
            },
            {
              $project: {
                _id: 1,
                text: 1,
                rating: 1,
                created_at: 1,
                updated_at: 1,
                user: {
                  $arrayElemAt: ["$users", 0],
                },
                show: {
                  $arrayElemAt: ["$shows", 0],
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          data: "$data",
          meta: {
            $ifNull: [
              { $arrayElemAt: ["$meta", 0] },
              {
                total_results: 0,
                current_page: page,
                results_limit: limit,
                total_pages: 0,
              },
            ],
          },
        },
      },
    ]);

    res.status(200).json(reviews[0]);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

// const getReviewById = async (req, res, next) => {
//   try {
//     if (!validateUUIDv4(req.params.id)) {
//       return next(createError(404, 'Invalid review ID'));
//     }
//     const review = await Review.findById(req.params.id).lean();
//     if (!review) {
//       return next(createError(404, `No review found with ID of ${req.params.id}`));
//     }
//     res.status(200).json(review);
//   } catch (err) {
//     return next(createError(500, err.message));
//   }
// };

const getReviewById = async (req, res, next) => {
  try {
    if (!validateUUIDv4(req.params.id)) {
      return next(createError(404, "Invalid review ID"));
    }
    const review = await Review.aggregate([
      { $match: { _id: req.params.id } },
      {
        $lookup: {
          from: "shows",
          let: { show_id: "$show_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$show_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                city: 1,
                country: 1,
                day: 1,
                date: 1,
                month: 1,
                state: 1,
                title: 1,
                venue: 1,
                year: 1,
                image: {
                  $arrayElemAt: ["$images", 0],
                },
              },
            },
          ],
          as: "shows",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { user_id: "$user_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$user_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                first_name: 1,
                last_name: 1,
              },
            },
          ],
          as: "users",
        },
      },
      {
        $project: {
          _id: 1,
          text: 1,
          rating: 1,
          created_at: 1,
          updated_at: 1,
          user: {
            $arrayElemAt: ["$users", 0],
          },
          show: {
            $arrayElemAt: ["$shows", 0],
          },
        },
      },
    ]);

    if (!review[0]) {
      return next(
        createError(404, `No review found with ID of ${req.params.id}`)
      );
    }
    res.status(200).json(review[0]);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const addReview = async (req, res, next) => {
  try {
    if (!validateUUIDv4(req.body.show_id)) {
      return next(createError(404, "Invalid show ID"));
    }
    if (!validateUUIDv4(req.user._id)) {
      return next(createError(404, "Invalid user ID"));
    }
    const show = await Show.findById(req.body.show_id).lean();
    if (!show) {
      return next(
        createError(404, `No show found with ID of ${req.body.show_id}`)
      );
    }
    const user = await User.find({ _id: req.user._id }).lean();
    if (!user) {
      return next(
        createError(404, `No user found with ID of ${req.body.user._id}`)
      );
    }

    const review = new Review({
      _id: validateUUIDv4(req.body._id) ? req.body._id : uuidv4(),
      text: req.body.text,
      rating: req.body.rating,
      show_id: req.body.show_id,
      user_id: req.user._id,
    });

    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    return next(createError(400, err.message));
  }
};

const updateReviewById = async (req, res, next) => {
  try {
    if (!validateUUIDv4(req.params.id)) {
      return next(createError(404, "Invalid review ID"));
    }
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(
        createError(404, `No review found with ID of ${req.params.id}`)
      );
    }
    if (review.user_id !== req.user._id) {
      return next(
        createError(
          403,
          `Not allowed to update review with ID of ${req.params.id}`
        )
      );
    }
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const deleteReviews = async (req, res, next) => {
  try {
    const result = await Review.deleteMany({});
    res.status(200).json({ msg: `Deleted ${result.deletedCount} reviews` });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const deleteReviewById = async (req, res, next) => {
  try {
    if (!validateUUIDv4(req.params.id)) {
      return next(createError(404, "Invalid review ID"));
    }
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(
        createError(404, `No review found with ID of ${req.params.id}`)
      );
    }
    if (review.user_id !== req.user._id) {
      return next(
        createError(
          403,
          `Not allowed to delete review with ID of ${req.params.id}`
        )
      );
    }
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: `Deleted review with ID of ${req.params.id}` });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

module.exports = {
  getReviews,
  getReviewById,
  addReview,
  updateReviewById,
  deleteReviews,
  deleteReviewById,
};
