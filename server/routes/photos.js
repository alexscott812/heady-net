const express = require('express');
const mongoose = require('mongoose');
const Photo = require('../models/photo');
const Show = require('../models/show');
const { cloudinary } = require('../utils/cloudinary');
const logger = require('../middleware/logger');

const router = express.Router();
router.use(logger);

// GET ALL PHOTOS

router.get('/', async (req,res) => {
  const sort = req.query.sort || "name"; // Default: "name"
  const sortField = (sort.substring(0,1) == '-') ? sort.substring(1) : sort;
  const sortOrder = (sort.substring(0,1) == '-') ? -1 : 1;
  const sortTest = {[sortField]:sortOrder};
  const page = Math.max((parseInt(req.query.page) || 1), 1); // Default: 1, Min: 1
  const limit = Math.min((parseInt(req.query.limit) || 20), 20); // Default: 0, Max: 20
  const skip = (page - 1) * limit;

  const query = {};
  if (req.query.name)
    query.name = new RegExp(req.query.name, 'i');

  try {

    const count = await Photo.countDocuments(query);
    const pages = Math.ceil(count / limit);
    const photos = await Photo.find(query).sort(sort).skip(skip).limit(limit).lean();

    let results = {
      meta: {
        total_results: count,
        results_limit: limit,
        current_page: page,
        total_pages: pages
      },
      data: photos
    };

    res.status(200).json(results);
    //res.status(200).json(shows);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET PHOTO

router.get('/:id', async (req,res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).json({ msg: 'Invalid ID' });
    const photo = await Photo.findById(req.params.id).lean();
    if (!photo) {
      return res.status(404).json({ msg: `No photo found with ID of ${req.params.id}` })
    }
    res.status(200).json(photo);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ADD PHOTO

router.post('/', async (req,res) => {
  try {
    // if (!mongoose.Types.ObjectId.isValid(req.body.show_id))
    //   return res.status(404).json({ msg: 'Invalid ID' });
    // const show = await Show.findById(req.body.show_id).lean();
    // if (!show) {
    //   return res.status(404).json({ msg: `No show found with ID of ${req.body.show_id}`})
    // }

    const fileString = req.body.image_data;
    const uploadResponse = await cloudinary.uploader.upload(fileString, { upload_preset: 'pqksnefp' });

    const photo = new Photo({
      url: uploadResponse.url,
      thumbnail_md_url: uploadResponse.eager[0].url,
      thumbnail_sm_url: uploadResponse.eager[1].url
      // show_id: req.body.show_id
    });

    const newPhoto = await photo.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// UPDATE PHOTO

router.put('/:id', async (req,res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).json({ msg: 'Invalid ID' });
    const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!photo) {
      return res.status(404).json({ msg: `No photo found with ID of ${req.params.id}` })
    }
    res.status(200).json(photo);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE ALL PHOTOS

router.delete('/', async (req,res) => {
  try {
    const result = await Photo.deleteMany({});

    res.status(200).json({ msg: `Deleted ${result.deletedCount} photos` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }

});

// DELETE PHOTO

router.delete('/:id', async (req,res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).json({ msg: 'Invalid ID' });
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) {
      return res.status(404).json({ msg: `No photo found with ID of ${req.params.id}` })
    }
    res.status(200).json({ msg: `Deleted photo with ID of ${req.params.id}` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
