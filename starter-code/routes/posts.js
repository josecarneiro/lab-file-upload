'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const Posts = require('./../models/posts');

//VIEW ALL POSTS
router.get('/', (req,res,next) =>{
    Posts.find()
    .populate('creatorId')
    .then(posts => {
        console.log(posts)
        res.render('./posts/index',{ posts })
    })
    .catch(error => {
        next(error)
    })
})

//CREATE A POST
router.get('/create', routeGuard, (req,res,next) =>{
    res.render('./posts/create')
})

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
  folder: 'lab-file-upload-posts',
  allowedFormats: ['jpg', 'png']
});

const uploader = multer({
  storage
});

router.post('/create', uploader.single('pic'), routeGuard, (req,res,next) => {
    const userID = req.session.user;
    let picPath = ""
    if(!req.file){
        picPath = undefined;
      }else{
        picPath = req.file.url
      }
    Posts.create({
        content: req.body.post,
        creatorId: userID,
        picPath: picPath,
        picName: req.body.pic
    })
    .then(post =>{
        res.redirect('/posts')
    })
    .catch(error =>{
        next(error)
    });
});

//VIEW A SPECIFIC POST

router.get('/:id', (req,res,next) =>{
    const postId = req.params.id
    console.log(postId);
    Posts.findById(postId)
    .populate('creatorId')
    .then(post => {
        console.log(post)
        res.render('./posts/singlepost',{ post })
    })
    .catch(error => {
        next(error)
    })
})





module.exports = router;