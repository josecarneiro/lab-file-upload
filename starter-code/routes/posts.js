'use strict';
const router = require('express').Router();
const imgUploader = require("../middleware/image-uploader");
const Post = require("../models/post");
const User = require("../models/user");

router.get('/', (req, res, next) => {
    Post.find().populate("author").then(posts => {
        console.log(posts);
        res.render('postList', {posts});
    });
});

router.post('/post', imgUploader.single("image"), (req, res, next) => {
    if(req.user) {
        const { content } = req.body;
        const imgUrl = req.file.url;
        Post.create({
            content,
            imgUrl,
            author: req.user._id
        }).then(post => {
            res.redirect("/posts");
        })
    } else {
        next(new Error("no User"));
    }
});
  

// router.get('/:id', (req, res, next) => {
//   console.log(req.user);
//   res.render('profile');
// });

module.exports = router;