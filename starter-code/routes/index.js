'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const Post = require('./../models/post');

router.get('/', (req, res, next) => {
  Post.find().then(post => {
    console.log(post);
    console.log(req.user);
    res.render('index', { post });
  });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
