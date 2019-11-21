const { Router } = require('express');
const router = new Router();

const User = require('./../models/user');
const bcryptjs = require('bcryptjs');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

const multer = require('multer');
const cloudinary = require('cloudinary');
const storageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = storageCloudinary({
  cloudinary,
  folder: 'lab-file-upload',
  allowedFormats: ['jpg', 'png']
});

const uploader = multer({
  storage
});

router.post('/sign-up', uploader.single('file'), (req, res, next) => {
  let cloudinaryImg = ""
  if(!req.file){
    cloudinaryImg = undefined;
  }else{
    cloudinaryImg = req.file.url
  }
  const { name, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then(hash => {
      return User.create({
        name,
        email,
        passwordHash: hash,
        profilePicture: cloudinaryImg
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
        res.redirect('/profile');
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

router.get('/profile', routeGuard, (req, res, next) => {
  const userID = req.session.user
  User.findById(userID)
  .then(user => {
    res.render('profile', { user });
  })
  .catch (error =>{
    next (error)
  })
});


module.exports = router;
