'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const Post = require('./../models/post');

router.get('/', (req, res, next) => {
  Post.find()
    .then(posts => {
      res.render('post/index', { posts });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create', routeGuard, (req, res, next) => {
  res.render('post/create');
});

const cloudinary = require('cloudinary');
const multer = require('multer');
const multerStorageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'posts',
  allowedFormats: ['jpg', 'png']
});

const uploader = multer({ storage });

router.post('/create', uploader.single('picPath'), (req, res, next) => {
  const { content, picName } = req.body;
  const { url } = req.file;
  const data = {
    content,
    creatorId: req.user._id,
    picPath: url,
    picName
  };
  Post.create(data)
    .then(post => {
      res.redirect(`${post._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Post.findById(id)
    .populate('creatorId')
    .then(post => {
      res.render('post/single', { post });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/comment', uploader.single('imagePath'), (req, res, next) => {
  let post;
  const { id } = req.params;
  const { content, imageName } = req.body;
  const url = req.file.url;
  const data = {
    content,
    authorId: req.user._id,
    imagePath: url,
    imageName
  };
  Post.findById(id)
    .then(doc => {
      post = doc;
      post.children.push(data);
      post.save();
      console.log(`doc: ${post} child: ${post.children}`);
    })
    .then(() => {
      res.redirect(`/post/${post._id}`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
