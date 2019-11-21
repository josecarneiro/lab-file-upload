const express = require('express');

const router = new express.Router();
const User = require("./../models/user");
const Post = require('./../models/post');
const Image = require('./../models/image');

const routeGuard = require('./../middleware/route-guard');

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
    res.render('post/create');
});

module.exports = router;