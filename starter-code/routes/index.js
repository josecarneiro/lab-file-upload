'use strict';

const { Router } = require('express');
const router = new Router();


const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  console.log(req.user);
  res.render('index', { title: 'Hello World!' });
});

router.get('/private', (req, res, next) => {
  res.render('private');
});




module.exports = router;
