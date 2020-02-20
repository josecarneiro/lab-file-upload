'use strict';

const { Router } = require('express');

const Post = require('./../models/post');

const router = new Router();

//in order to upload files we need the following things
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'lab-file-upload',
  allowedFormats: ['jpg', 'png']
});

const uploader = multer({ storage });

router.get('/post', (req, res, next) => {
  req.session.user = user._id;
  res.redirect('/post');
});

module.exports = router;
