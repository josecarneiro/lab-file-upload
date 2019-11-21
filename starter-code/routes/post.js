'use strict';
const express = require('express');
const router = new express.Router();

const Post = require('./../models/post');
const Image = require('./../models/image');

const routeGuard = require('./../middleware/route-guard');

router.get('/create', routeGuard, (req, res, next) => {
  res.render('post/create');
});

const uploadCloud = require('./../config/cloudinary');

router.post(
  '/create',
  routeGuard,
  uploadCloud.array('images', 5),
  (req, res, next) => {
    // console.log(req.file);
    const text = req.body.text;
    const author = req.session.user;

    const imageObjectArray = (req.files || []).map(file => {
      return {
        url: file.url
      };
    });

    Image.create(imageObjectArray)
      .then((images = []) => {
        const imageIds = images.map(image => image._id);
        return Post.create({
          text,
          author,
          images: imageIds
        });
      })
      .then(document => {
        res.redirect(`/post/${document._id}`);
      })
      .catch(error => {
        next(error);
      });
  }
);

router.get('/:postId', (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .populate('author images')
    .then(post => {
      console.log(post);
      res.render('post/single', { post });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
