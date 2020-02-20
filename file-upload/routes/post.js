'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');
const routeGuard = require('./../middleware/route-guard');
const bindUser = require('./../middleware/bind-user-to-view-locals');

//GET Routes

router.get('/', (req, res, next) => {
  Post.find()
    .limit(10)
    .then(posts => {
      res.render('post/index', { posts });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create', (req, res, next) => {
  res.render('post/create');
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      res.render('post/show', { post });
    })
    .catch(error => {
      next(error);
    });
});

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

router.post('/create', routeGuard, uploader.single('picture'), (req, res, next) => {
  const creatorID = req.user._id;
  const { pictureName, content } = req.body;
  const { url } = req.file;
  console.log(creatorID);

  Post.create({
    picName: pictureName,
    content,
    picPath: url,
    creatorID
  })
    .then(post => {
      res.redirect(`/post/${post._id}`, { post });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
