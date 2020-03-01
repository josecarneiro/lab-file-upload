'use strict';

const uploadCloud = require('../cloudinary.js');

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');

router.get('/', (req, res, next) => {
  Post.find({})
    .then(posts => {
      res.render('index', { title: 'Hello World!', posts });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/private', (req, res, next) => {
  res.render('private');
});

module.exports = router;
