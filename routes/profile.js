const { Router } = require('express');
const router = new Router();

const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');

router.get('/profile', routeGuard, (req, res, next) => {
  res.render('profile');
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
