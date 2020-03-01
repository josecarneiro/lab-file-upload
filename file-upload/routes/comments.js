'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');
const routeGuard = require('./../middleware/route-guard');
const Comment = require('./../models/comment');
const bindUser = require('./../middleware/bind-user-to-view-locals');

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

router.get('/:id/create', (req, res, next) => {
  res.render('comment/create');
});

router.post('/:id/create', routeGuard, bindUser, uploader.single('picture'), (req, res, next) => {
  const authorID = req.user._id;
  const { imageName, content } = req.body;
  const { url } = req.file;

  const post = req.params.id;

  Comment.create({
    post,
    imageName,
    content,
    imagePath: url,
    authorID
  })
    .then(comment => {
      console.log(comment);
      res.redirect(`/post/${post}`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
