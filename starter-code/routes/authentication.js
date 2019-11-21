const { Router } = require('express');
const router = new Router();
const uploader = require('./../middleware/uploader');
const multer = require('multer');
const User = require('./../models/user');
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary');
const storageCloudinary = require('multer-storage-cloudinary');
require('dotenv').config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_API_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const storage = storageCloudinary({
//   cloudinary,
//   folder: 'profile-pics',
//   allowedFormats: ['jpg', 'png']
// });

// const uploader = multer({
//   storage
// });

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

const uploadVar = uploader.single('profile-pics');

router.post('/sign-up', uploadVar, (req, res, next) => {
  const { name, email, password } = req.body;
  const fileUrl = null;
  if (req.file) {
    fileUrl = req.file.url;
  }
  console.log('router.post has been called');
  console.log('this is the req.file' + req.file);
  bcryptjs
    .hash(password, 10)
    .then(hash => {
      return User.create({
        name,
        email,
        passwordHash: hash,
        picture: fileUrl
      });
    })
    .then(user => {
      req.session.user = user._id;
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res, next) => {
  let userId;
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        userId = user._id;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        req.session.user = userId;
        res.redirect('/');
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

const routeGuard = require('./../middleware/route-guard');

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
