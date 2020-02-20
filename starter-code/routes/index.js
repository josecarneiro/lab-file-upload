'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

const User = require('./../models/user');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

router.get('/profile', routeGuard, (req, res, next) => {
  res.render('profile');

  const userID = req.session.user;
  User.findById(userID)
    .then(user => {
      res.render('profile', { user });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
