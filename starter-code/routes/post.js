const express = require('express');

const router = new express.Router();
const User = require("./../models/user");
const Post = require('./../models/post');
const Image = require('./../models/image');

const routeGuard = require('./../middleware/route-guard');



router.get('/create/:user_id', routeGuard, (req, res, next) => {
    const userId = req.params.user_id;

    User.findById(userId)
        .then(user => {
            res.render('post/create', {
                user
            });
        })
        .catch(error =>
            next(error));
});

const uploader = require('./../middleware/upload');

router.post('/create/:user_id', routeGuard, uploader.array('images', 5), (req, res, next) => { ////I AM HERE
    const userId = req.params.user_id;

    const originalName = req.files[0].originalname;
    const urlImage = req.files[0].url;
  
    User.findById(userId)
        .then(user => {
            return Post.create({
                    content: req.body.content,
                    creatorId: user._id,
                    picPath: urlImage,
                    picName: originalName
                })
                .then(post => {
                   
                    res.render('post/create', user)

                })
                .catch(err => {
                   
                    next(err);
                })
                .catch(err => {
                   
                    next(err);
                });
        });
});

router.get('/list', (req, res, next) => {
    Post.find()
        .sort({
            creationDate: -1
        })
        .then(posts => {
            res.render('post/list', {
                posts
            });
        })
        .catch(error => {
            next(error);
        });
});

router.get('/:post_id', (req, res, next) => {
    const postId = req.params.post_id;
    Post.findById(postId)
        .then(post => {
            
            res.render('post/show', {
                post
            });
        })
        .catch(error => {
            next(error);
        });
});


module.exports = router;