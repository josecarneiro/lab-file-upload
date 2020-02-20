'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

const Post = require('./../models/post');

router.get('/', routeGuard, (req, res, next) => {
  Post.find()
    .then(posts => {
      res.render('post/index', { posts });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Post.findById(id)
    .then(post => {
      res.render('post/single', { post });
    })
    .catch(error => {
      next(error);
    });
});


router.get('/create', routeGuard, (req, res, next) => {
  res.render('post/create');
});

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
  folder: 'jan20',
  allowedFormats: ['jpg', 'png']
});

const uploader = multer({ storage });

router.post('/create', routeGuard, uploader.single('picture'), (req, res, next) => {
  const { content } = req.body;
  const { url } = req.file;

  Post.create({
    content,
    picPath: url
  })
    .then(() => {
      res.redirect(`/post/show`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
