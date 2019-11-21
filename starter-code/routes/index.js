'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  console.log(req.user);
  res.render('index', { title: 'Hello World!' });
});

const routeGuard = require("./../middleware/route-guard");

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
