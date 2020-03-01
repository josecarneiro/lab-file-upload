const { Router } = require('express');
const router = new Router();
const Comment = require('./../models/comment');
const uploadCloud = require('./../config/cloudinary.js');


router.post('/:idPost/create', uploadCloud.single('photo'), (req, res, next) => {
    const content = req.body.content;
    const authorId = req.user._id;
    const imagePath = req.file.secure_url;
    const imageName = req.body.name;
    const postId = req.params.idPost;
    
    Comment.create({
        content,
        authorId,
        imagePath,
        imageName,
        postId
    })
    .then((comment) => {
      console.log(comment);
        res.redirect(`/comment/${comment._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
    const idComment = req.params.id;
  
    Comment.findById(idComment)
      .populate('authorId')
      .then((comment) => {
        const data = { comment };
        res.render('comment/show', comment);
      })
      .catch(error => {
        next(error);
      });
  });


module.exports = router;