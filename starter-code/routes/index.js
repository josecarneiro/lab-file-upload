'use strict';

const {
  Router
} = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  console.log(req.user);
  res.render('index', {
    title: 'Hello Surfer!'
  });
});

router.get('/private', (req, res, next) => {
  res.render('private');
});


//código Zé


module.exports = router;