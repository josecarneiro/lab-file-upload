const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');
const Comment = require('./../models/comment');
const uploadCloud = require('./../config/cloudinary.js');

router.get('/create', (req, res, next) => {
  res.render('post/create');
});

router.post('/create', uploadCloud.single('photo'), (req, res, next) => {
    const content = req.body.content;
    const creatorId = req.user._id;
    const picPath = req.file.secure_url;
    const picName = req.body.name;

    Post.create({
        content,
        creatorId,
        picPath,
        picName
    })
    .then((post) => {
        res.redirect(`/post/${post._id}`);
    })
    .catch(error => {
      next(error);
    });
});


router.get('/:id', (req, res, next) => {
  const idPost = req.params.id;
  let correctPost = null;

  Post.findById(idPost)
    .populate('creatorId')
    .then((post) => {
      correctPost = post;
      Comment.find({ 'postId' : idPost })
      .then((comments) => {
        console.log(idPost);
        console.log(comments);
        const data = { correctPost, comments };
        res.render('post/show', data);
      })
      .catch(error => {
        next(error);
      });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;