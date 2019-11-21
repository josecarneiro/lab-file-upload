'use strict';

const { Router } = require('express');
const postRouter = new Router();
const routeGuard = require('./../middleware/route-guard');
const Post = require('./../models/post');
const uploader = require('./../middleware/uploader');

const uploadVar = uploader.single('images');

postRouter.get('/create', routeGuard, (req, res, next) => {
  console.log(req.user);
  res.render('newpost', { title: 'Hello World!' });
});

postRouter.post('/create', routeGuard, uploadVar, (req, res, next) => {
  const fileUrl = null;
  if (req.file) {
    fileUrl = req.file.url;
  }
  Post.create({
    content: req.body.content,
    picture: fileUrl
  }).then(() => res.redirect('/'));
});

postRouter.get('/', routeGuard, (req, res, next) => {
  Post.find()
    .then(data => {
      console.log(data);
      res.render('allposts', { data });
    })
    .catch(error => res.redirect('/'));
});

module.exports = postRouter;
