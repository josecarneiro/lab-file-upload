'use strict';

const { Router } = require('express');
const router = new Router();

const Comment = require('./../models/comment');

router.get('/post/show', (req, res, next) => {
  Comment.find()
    .then(comment => {
      res.render('post/show', { comment });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/post/:id/show', (req, res, next) => {
  const { content } = req.body;

  Comment.create({
    content
  })
    .then(comment => {
      res.redirect(`/post`, { comment });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
