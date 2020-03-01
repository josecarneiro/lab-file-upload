'use strict';

const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');

router.get('/', (req, res, next) => {
  console.log(req.user);

  Post.find({})
  .populate('creatorId')
  .then((posts) => {
    const data = { posts };
    res.render('index', data);
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
