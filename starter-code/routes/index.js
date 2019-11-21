'use strict';

const { Router } = require('express');
const router = new Router();

const Post = require('./../models/post');
const Image = require('./../models/image');

const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  console.log(req.user);
  Post.find()
    .sort({ creationDate: -1 })
    .populate('author images')
    .then(posts => {
      res.render('index', { posts });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/private', (req, res, next) => {
  res.render('private');
});

module.exports = router;
