const Song = require('../models/song');
const { v4: uuidv4 } = require('uuid');
const validateUUIDv4 = require('../utils/validate-uuid-v4');
const createError = require('../utils/create-error');

const getSongs = async (req, res, next) => {
	const sort = req.query.sort || 'name'; // Default: 'name'
	const sortField = sort.substring(0, 1) === '-' ? sort.substring(1) : sort;
	const sortOrder = sort.substring(0, 1) === '-' ? -1 : 1;
	const sortQuery = { [sortField]: sortOrder };
	const page = Math.max(parseInt(req.query.page) || 1, 1); // Default: 1, Min: 1
	const limit = Math.min(parseInt(req.query.limit) || 12, 1000); // Default: 12, Max: 1000
	const skip = (page - 1) * limit;

	const query = {};
	if (req.query.q) query.name = { $regex: req.query.q, $options: 'i' };

	try {
		const songs = await Song.aggregate([
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
										$divide: ['$total_results', limit]
									}
								}
							}
						}
					],
					data: [{ $skip: skip }, { $limit: limit }]
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

		res.status(200).json(songs[0]);
	} catch (err) {
		return next(createError(500, err.message));
	}
};

const getSongById = async (req, res, next) => {
	try {
		if (!validateUUIDv4(req.params.id)) {
			return next(createError(404, 'Invalid song ID'));
		}
		const song = await Song.aggregate([
			{ $match: { _id: req.params.id } },
			{
				$lookup: {
					from: 'shows',
					localField: '_id',
					foreignField: 'sets.song_instances.song._id',
					pipeline: [{ $sort: { date: 1 } }],
					as: 'shows'
				}
			},
			{
				$project: {
					_id: 1,
					name: 1,
					show_count: {
						$size: '$shows'
					},
					first_show: {
						$first: '$shows'
					},
					last_show: {
						$last: '$shows'
					}
				}
			}
		]);
		if (!song[0]) {
			return next(
				createError(404, `No song found with ID of ${req.params.id}`)
			);
		}
		res.status(200).json(song[0]);
	} catch (err) {
		return next(createError(500, err.message));
	}
};

const addSong = async (req, res, next) => {
	try {
		const song = new Song({
			_id: validateUUIDv4(req.body._id) ? req.body._id : uuidv4(),
			name: req.body.name
		});

		const newSong = await song.save();
		res.status(201).json(newSong);
	} catch (err) {
		return next(createError(400, err.message));
	}
};

const updateSongById = async (req, res, next) => {
	try {
		if (!validateUUIDv4(req.params.id)) {
			return next(createError(404, 'Invalid song ID'));
		}
		const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		}).lean();
		if (!song) {
			return next(
				createError(404, `No song found with ID of ${req.params.id}`)
			);
		}
		res.status(200).json(song);
	} catch (err) {
		return next(createError(500, err.message));
	}
};

const deleteSongs = async (req, res, next) => {
	try {
		const result = await Song.deleteMany({});
		res.status(200).json({ msg: `Deleted ${result.deletedCount} songs` });
	} catch (err) {
		return next(createError(500, err.message));
	}
};

const deleteSongById = async (req, res, next) => {
	try {
		if (!validateUUIDv4(req.params.id)) {
			return next(createError(404, 'Invalid song ID'));
		}
		const song = await Song.findOneAndDelete({ _id: req.params.id });
		if (!song) {
			return next(
				createError(404, `No song found with ID of ${req.params.id}`)
			);
		}
		res.status(200).json({ msg: `Deleted song with ID of ${req.params.id}` });
	} catch (err) {
		return next(createError(500, err.message));
	}
};

module.exports = {
	getSongs,
	getSongById,
	addSong,
	updateSongById,
	deleteSongs,
	deleteSongById
};
