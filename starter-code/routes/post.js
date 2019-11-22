const express = require('express');
const postRouter = new express.Router();
const Post = require('./../models/post');
const Image = require('./../models/image');
const routeGuard = require('./../middleware/route-guard');
postRouter.get('/index', (req, res, next) => {
  Post.find()
    .sort({ creationDate: -1 })
    .populate('author images')
    .then(posts => {
      res.render('/index', { posts });
    })
    .catch(error => {
      next(error);
    });
});
postRouter.get('/create', routeGuard, (req, res, next) => {
  res.render('post/create');
});
const uploader = require('./../middleware/upload');
postRouter.post(
  '/create',
  routeGuard,
  uploader.array('images', 5),
  (req, res, next) => {
    // console.log(req.file);
    const text = req.body.text;
    const author = req.session.user;
    const imageObjectArray = (req.files || []).map(file => {
      return {
        url: file.url
      };
    });
    Image.create(imageObjectArray)
      .then((images = []) => {
        const imageIds = images.map(image => image._id);
        return Post.create({
          text,
          author,
          images: imageIds
        });
      })
      .then(document => {
        res.redirect(`/post/${document._id}`);
      })
      .catch(error => {
        next(error);
      });
  }
);
postRouter.get('/:postId', (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .populate('author images')
    .then(post => {
      console.log(post);
      res.render('post/show', { post });
    })
    .catch(error => {
      next(error);
    });
});
// router.get('/:postId/edit', routeGuard, (req, res, next) => {
//   const postId = req.params.postId;
//   Post.findById(postId)
//     .then(post => {
//       if (post.author === req.session.user) {
//         res.render('post/edit', { post });
//       } else {
//         next(new Error('User has no permission to edit post.'));
//       }
//     })
//     .catch(error => {
//       next(error);
//     });
// // });
// router.post('/:postId/edit', routeGuard, (req, res, next) => {
//   const postId = req.params.postId;
//   Post.findOneAndUpdate(
//     {
//       _id: postId,
//       author: req.session.user
//     },
//     {
//       text: req.body.text
//     }
//   )
//     .then(data => {
//       res.redirect(`/post/${postId}`);
//     })
//     .catch(error => {
//       next(error);
//     });
// });
postRouter.post('/:postId/delete', routeGuard, (req, res, next) => {
  const postId = req.params.postId;
  Post.findOneAndDelete({
    _id: postId,
    author: req.session.user
  })
    .then(data => {
      res.redirect(`/index`);
    })
    .catch(error => {
      next(error);
    });
});
module.exports = postRouter;











