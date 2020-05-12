'use strict';

const { Router } = require('express');
const Post = require('./../models/post');
const routeGuard = require('./../middleware/route-guard');
const router = new Router();

router.get('/', (req, res, next) => {
  console.log(req.user);

  Post.find()
    .sort({ creationDate: -1 })
    .populate('creator')
    .then((posts) => {
      res.render('index', { posts });
    })
    .catch((error) => {
      next(error);
    });

  //res.render('index', { title: 'Hello World!' });
});

router.get('/private', (req, res, next) => {
  res.render('private');
});

module.exports = router;
