'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');
const routeGuard = require('./../middleware/route-guard');
const bindUser = require('./../middleware/bind-user-to-view-locals');

// cloudinary and multer config
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'jan20',
  allowedFormats: ['jpg', 'png', 'mov', 'mp4']
});

const uploader = multer({ storage });

router.post('/create', routeGuard, bindUser, uploader.single('picture'), (req, res, next) => {
  const { author } = req.user._id;
  const { pictureName, content } = req.body;
  const { url } = req.file;

  Post.create({
    picName: pictureName,
    content,
    picPath: url,
    creatorID: author
  })
  .then(post =>)

});

module.exports = router;
