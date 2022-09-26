const Show = require('../models/show');
const { v4: uuidv4 } = require('uuid');
const validateUUIDv4 = require('../utils/validate-uuid-v4');
const createError = require('../utils/create-error');

// const getShows = async (req, res, next) => {
//   const sort = req.query.sort || 'date'; // Default: 'date'
//   const sortField = (sort.substring(0,1) === '-') ? sort.substring(1) : sort;
//   const sortOrder = (sort.substring(0,1) === '-') ? -1 : 1;
//   const sortQuery = { [sortField]: sortOrder };
//   const page = Math.max((parseInt(req.query.page) || 1), 1); // Default: 1, Min: 1
//   const limit = Math.min((parseInt(req.query.limit) || 12), 20); // Default: 12, Max: 20
//   const skip = (page - 1) * limit;

//   const query = {};
//   if (req.query.search) query.title = { $regex: req.query.search, $options: 'i' };
//   if (req.query.city) query['city._id'] = req.query.city;
//   if (req.query.country) query['country._id'] = req.query.country;
//   if (req.query.state) query['state._id'] = req.query.state;
//   if (req.query.venue) query['venue._id'] = req.query.venue;
//   if (req.query.song) query['sets.song_instances.song._id'] = req.query.song;
//   if (req.query.day) query.day = parseInt(req.query.day);
//   if (req.query.month) query.month = parseInt(req.query.month);
//   if (req.query.year) query.year = parseInt(req.query.year);

//   try {
//     const count = await Show.countDocuments(query);
//     const pages = Math.ceil(count / limit);
//     //const shows = await Show.find(query, 'title month day year date venue city state country').sort(sort).skip(skip).limit(limit).lean();
//     const shows = await Show.aggregate([
//       { $match: query },
//       { $sort: sortQuery },
//       { $skip: skip },
//       { $limit: limit },
//       {
//         $lookup: {
//           from: 'reviews',
//           let: {
//             show_id: '$_id'
//           },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $eq: [
//                     '$show_id',
//                     '$$show_id'
//                   ]
//                 }
//               }
//             }
//           ],
//           as: 'reviews'
//         }
//       },
//       {
//         '$project': {
//           '_id': 1,
//           'city': 1,
//           'country': 1,
//           'day': 1,
//           'date': 1,
//           'month': 1,
//           'state': 1,
//           'title': 1,
//           'venue': 1,
//           'year': 1,
//           'image': {
//             $arrayElemAt: [
//               '$images',
//               0
//               // { $floor: { $multiply: [ { $rand: {} }, { $floor: { $size: '$images' } } ] } }
//             ]
//           },
//           'review_count': {
//             $size: '$reviews'
//           },
//           'avg_rating': {
//             $ifNull: [
//               {
//                 $round : [
//                   {
//                     $avg: '$reviews.rating'
//                   },
//                   1
//                 ]
//               },
//               0.0
//             ]
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
//       data: shows
//     };

//     redisClient.set(req.originalUrl, JSON.stringify(results));
//     res.status(200).json(results);
//   } catch (err) {
//     return next(createError(500, err.message));
//   }
// };

const getShows = async (req, res, next) => {
  const sort = req.query.sort || 'date'; // Default: 'date'
  const sortField = (sort.substring(0,1) === '-') ? sort.substring(1) : sort;
  const sortOrder = (sort.substring(0,1) === '-') ? -1 : 1;
  const sortQuery = { [sortField]: sortOrder };
  const page = Math.max((parseInt(req.query.page) || 1), 1); // Default: 1, Min: 1
  const limit = Math.min((parseInt(req.query.limit) || 12), 20); // Default: 12, Max: 20
  const skip = (page - 1) * limit;

  const query = {};
  if (req.query.search) query.title = { $regex: req.query.search, $options: 'i' };
  if (req.query.city) query['city._id'] = req.query.city;
  if (req.query.country) query['country._id'] = req.query.country;
  if (req.query.state) query['state._id'] = req.query.state;
  if (req.query.venue) query['venue._id'] = req.query.venue;
  if (req.query.song) query['sets.song_instances.song._id'] = req.query.song;
  if (req.query.day) query.day = parseInt(req.query.day);
  if (req.query.month) query.month = parseInt(req.query.month);
  if (req.query.year) query.year = parseInt(req.query.year);

  try {
    const shows = await Show.aggregate([
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
              $lookup: {
                from: 'reviews',
                let: { show_id: '$_id' },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: [ '$show_id', '$$show_id' ] }
                    }
                  }
                ],
                as: 'reviews'
              }
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
                image: { $arrayElemAt: [ '$images', 0 ] },
                review_count: { $size: '$reviews' },
                avg_rating: {
                  $ifNull: [ { $round: [ { $avg: '$reviews.rating' }, 1 ] }, 0 ]
                }
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

    res.status(200).json(shows[0]);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const getShowById = async (req, res, next) => {
  try {
    if (!validateUUIDv4(req.params.id)) {
      return next(createError(404, 'Invalid show ID'));
    }
    const show = await Show.aggregate([
      { $match: { _id: req.params.id } },
      {
        $lookup: {
          from: 'reviews',
          let: { show_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [ '$show_id', '$$show_id' ]
                }
              }
            }
          ],
          as: 'reviews'
        }
      },
      {
        '$project': {
          '_id': 1,
          'city': 1,
          'country': 1,
          'day': 1,
          'date': 1,
          'month': 1,
          'state': 1,
          'title': 1,
          'venue': 1,
          'year': 1,
          'sets': 1,
          'images': 1,
          'review_count': {
            $size: '$reviews'
          },
          'avg_rating': {
            $ifNull: [
              {
                $round: [
                  { $avg: '$reviews.rating' },
                  1
                ]
              },
              0.0
            ]
          }
        }
      }
    ]);

    if (!show[0]) {
      next(createError(404, `No show found with ID of ${req.params.id}`));
    }
    res.status(200).json(show[0]);
  } catch (err) {
    next(createError(500, err.message));
  }
};

const getRandomShow = async (req, res, next) => {
  try {
    const show = await Show.aggregate([
      { $sample: { size: 1 } },
      {
        $lookup: {
          from: 'reviews',
          let: { show_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [ '$show_id', '$$show_id' ]
                }
              }
            }
          ],
          as: 'reviews'
        }
      },
      {
        '$project': {
          '_id': 1,
          'city': 1,
          'country': 1,
          'day': 1,
          'date': 1,
          'month': 1,
          'state': 1,
          'title': 1,
          'venue': 1,
          'year': 1,
          'sets': 1,
          'images': 1,
          'review_count': {
            $size: '$reviews'
          },
          'avg_rating': {
            $ifNull: [
              {
                $round : [
                  { $avg: '$reviews.rating' },
                  1
                ]
              },
              0.0
            ]
          }
        }
      }
    ]);

    if (!show[0]) {
      next(createError(404, 'Cannot find random show'));
    }
    res.status(200).json(show[0]);
  } catch (err) {
    next(createError(500, err.message));
  }
};

const getPopularShows = async (req, res, next) => {
  const popularShows = [
    '5/8/1977',
    '8/27/1972',
    '7/8/1978',
    '9/3/1977',
    '5/2/1970',
    '7/7/1989'
  ];

  try {
    const shows = await Show.aggregate([
      {
        $match: {
          title: {
            $in: popularShows
          }
        }
      },
      {
        '$project': {
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
          image: { $arrayElemAt: [ '$images', 0 ] },
        }
      }
    ]);

    res.status(200).json(shows);
  } catch (err) {
    next(createError(500, err.message));
  }
};

const addShow = async (req, res, next) => {
  try {
    const show = new Show({
      _id: validateUUIDv4(req.body._id) ? req.body._id : uuidv4(),
      title: req.body.title,
      day: parseInt(req.body.day),
      month: parseInt(req.body.month),
      year: parseInt(req.body.year),
      date: new Date(req.body.date),
      city: req.body.city,
      country: req.body.country,
      state: req.body.state,
      venue: req.body.venue,
      sets: req.body.sets,
      images: req.body.images
    });
    const newShow = await show.save();
    res.status(201).json(newShow);
  } catch (err) {
    return next(createError(400, err.message));
  }
};

const updateShowById = async (req, res, next) => {
  try {
    if (!validateUUIDv4(req.params.id)) {
      return next(createError(404, 'Invalid show ID'));
    }
    const show = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!show) {
      return next(createError(404, `No show found with ID of ${req.params.id}`));
    }
    res.status(200).json(show);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const deleteShows = async (req, res, next) => {
  try {
    const result = await Show.deleteMany({});
    res.status(200).json({ msg: `Deleted ${result.deletedCount} shows` });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const deleteShowById =  async (req, res, next) => {
  try {
    if (!validateUUIDv4(req.params.id)) {
      return next(createError(404, 'Invalid show ID'));
    }
    const show = await Show.findByIdAndDelete(req.params.id);
    if (!show) {
      return next(createError(404, `No show found with ID of ${req.params.id}`));
    }
    res.status(200).json({ msg: `Deleted show with ID of ${req.params.id}` });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

module.exports = {
  getShows,
  getShowById,
  getRandomShow,
  getPopularShows,
  addShow,
  updateShowById,
  deleteShows,
  deleteShowById
};
