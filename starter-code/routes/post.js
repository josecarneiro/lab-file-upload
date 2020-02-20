const { Router } = require("express");
const router = new Router();
const routeGuard = require("../middleware/route-guard");

const User = require("./../models/user");
const uploadCloud = require("../middleware/cloudinary");
const Image = require("../models/image");
const Post = require("../models/post");

router.get("/", (req, res, next) => {
  Post.find()
    .sort({ creationDate: -1 })
    .populate("creatorId images")
    .then(posts => {
      //console.log(posts);
      res.render("post/index", { posts });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/new", routeGuard, (req, res, next) => {
  res.render("post/new");
});

router.post(
  "/new",
  routeGuard,
  uploadCloud.array("images", 5),
  (req, res, next) => {
    const content = req.body.content;
    const creatorId = req.session.user;

    const imageObjectArray = (req.files || []).map(file => {
      return {
        url: file.url
      };
    });

    Image.create(imageObjectArray)
      .then((images = []) => {
        const imageIds = images.map(image => image._id);
        return Post.create({
          content,
          creatorId,
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

router.get("/:postId", (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .populate("creatorId images")
    .then(post => {
      console.log(post);
      res.render("post/single", { post });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
