'use strict';

const { Router } = require('express');
const router = new Router();

const Post = require('./../models/post');
const routeGuard = require('./../middleware/route-guard');

//CLOUDINARY CONFIG
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'Post'
});

const uploader = multer({ storage });
// const uploader = multer({ dest: 'tmp' }); // Storing locally in tmp folder
//--------------------------------------------------------

router.get('/create', routeGuard, (req, res, next) => {
  res.render('post/create');
});

router.post('/create', routeGuard, uploader.single('picture'), (req, res, next) => {
  const content = req.body.message;
  const creator = req.user._id;
  const pictureUrl = req.file.url;
  const pictureName = req.body.pictureName;

  Post.create({ content, creator, pictureUrl, pictureName })

    .then((post) => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/feed', (req, res, next) => {
  Post.find()
    .sort({ creationDate: -1 })
    .populate('creator')
    .then((posts) => {
      res.render('post/feed', { posts });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
