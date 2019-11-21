const {
  Router
} = require("express");
const router = new Router();

const User = require("./../models/user");
const bcryptjs = require("bcryptjs");

const uploader = require("./../middleware/upload");
const Image = require("./../models/image");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
});

router.post("/sign-up", uploader.array("images", 5), (req, res, next) => {
  const {
    name,
    email,
    password
  } = req.body;
  const imageObjectArray = (req.files || []).map(file => {
    return {
      url: file.url
    };
  });
  Image.create(imageObjectArray).then((images = []) => {
    const imageIds = images.map(image => image._id);
    return bcryptjs
      .hash(password, 10)
      .then(hash => {
        return User.create({
          name,
          email,
          passwordHash: hash,
          images: imageIds
        });
      })
      .then(user => {
        req.session.user = user._id;
        res.redirect(`/${user._id}`);
      })
      .catch(error => {
        next(error);
      });
  });
});

router.get("/sign-in", (req, res, next) => {
  res.render("sign-in");
});

router.post("/sign-in", (req, res, next) => {
  let userId;
  const {
    email,
    password
  } = req.body;
  User.findOne({
      email
    })
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
        res.redirect("/");
      } else {
        return Promise.reject(new Error("Wrong password."));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post("/sign-out", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

const routeGuard = require("./../middleware/route-guard");

router.get("/:user_id", routeGuard, (req, res, next) => {
  console.log(req.params);
  const userId = req.params.user_id;
  console.log('I am inside .get from user!', userId);
  User.findById(userId)
    .populate('user images')
    .then(user => {
      console.log(user);
      res.render('private', {
        user
      });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;