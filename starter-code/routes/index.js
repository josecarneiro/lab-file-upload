"use strict";

const { Router } = require("express");
const router = new Router();

const uploadCloud = require("../middleware/cloudinary.js");

router.get("/", (req, res, next) => {
  res.render("index", { title: "Hello World!" });
});

router.get("/private", (req, res, next) => {
  res.render("private");
});

module.exports = router;
