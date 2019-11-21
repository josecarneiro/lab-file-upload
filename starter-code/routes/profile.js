'use strict';
const router = require('express').Router();

router.get('/:id', (req, res, next) => {
  console.log(req.user);
  res.render('profile');
});

module.exports = router;