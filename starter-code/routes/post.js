'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const Post = require('./../models/post');
const Comment = require('./../models/comment');
const uploadCloud = require('../cloudinary.js');

router.get('/create', routeGuard, (req, res, next) => {
  res.render('creator');
});

router.post('/create', uploadCloud.single('picPath'), (req, res, next) => {
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

router.post('/:idPost/comment', uploadCloud.single('imagePath'), (req, res, next) => {
  const { content, imageName } = req.body;
  const { url } = req.file;
  const idPost = req.params.idPost;

  const data = {
    content,
    authorId: req.user._id,
    postId: idPost,
    imagePath: url,
    imageName
  };
  Comment.create(data)
    .then(post => {
      res.redirect(`/post/${idPost}`);
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
      Comment.find({ postId: id })
        .then(comments => {
          console.log(comments);
          res.render('single', { post, comments });
        })
        .catch(error => {
          next(error);
        });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
