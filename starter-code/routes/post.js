'use strict';

const { Router } = require('express');

const Post = require('./../models/post');

const router = new Router();

//in order to upload files we need the following things
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');
const routeGuard = require('./../middleware/route-guard');

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

router.get('/create', routeGuard, (req, res, next) => {
  res.render('post/create');
});

router.post('/create', uploader.single('picture'), (req, res, next) => {
  // console.log(req.file);
  const creatorId = req.user;
  const { content, picName } = req.body;
  const { url } = req.file;
  Post.create({
    content,
    picName,
    picPath: url,
    creatorId
  })
    .then(post => res.redirect('/'))
    .catch(error => next(error));
});

router.get('/:id/edit', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Post.findById(id)
    .then(post => {
      return res.render('post/edit', post);
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

router.post('/:id/edit', uploader.single('picture'), (req, res, next) => {
  // console.log(req.file);
  const id = req.params.id;
  const creatorId = req.user;
  const { content, picName } = req.body;
  const { url } = req.file;
  Post.findByIdAndUpdate(id, {
    content,
    picName,
    picPath: url,
    creatorId
  })
    .then(post => res.redirect('/'))
    .catch(error => next(error));
});

router.post('/:id/delete', (req, res, next) => {
  console.log(req.params.id);
  Post.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error);
      next(error);
    });
});

router.get('/:id', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Post.findById(id)
    .then(post => {
      return res.render('post/show', post);
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
