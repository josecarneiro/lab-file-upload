"use strict";

const { Router } = require("express");
const router = new Router();

const User = require("./../models/user");
const Image = require("./../models/image");
const bcryptjs = require("bcryptjs");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
});

const uploader = require("./../middleware/upload");

router.post("/sign-up", uploader.single("profileImage"), (req, res, next) => {
  console.log(req.file);
  const { name, email, password } = req.body;
  const profileImage = req.file.secure_url;
  bcryptjs
    .hash(password, 10)
    .then(hash => {
      return User.create({
        name,
        email,
        passwordHash: hash,
        profileImage
      });
    })
    .then(user => {
      req.session.user = user._id;
      res.redirect('/');
      // res.redirect("/private");
    })
    .catch(error => {
      next(error);
    });
});

router.get("/sign-in", (req, res, next) => {
  res.render("sign-in");
});

router.post("/sign-in", (req, res, next) => {
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

router.get("/private", routeGuard, (req, res, next) => {
  res.render("private");
});

module.exports = router;
