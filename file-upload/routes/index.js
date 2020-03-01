'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const bindUser = require('./../middleware/bind-user-to-view-locals');
const Post = require('./../models/post');

router.get('/', routeGuard, (req, res, next) => {
  const user = req.user._id;
  Post.find()
    .limit(50)
    .then(posts => {
      res.render('post/index', { posts, user });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
