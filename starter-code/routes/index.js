"use strict";

const { Router } = require("express");
const router = new Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const storageCloudinary = require("multer-storage-cloudinary");

router.get("/", (req, res, next) => {
  console.log("req.user", req.user);
  res.render("index", { title: "Hello World!" });
});

router.get("/private", (req, res, next) => {
  res.render("private");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = storageCloudinary({
  cloudinary,
  folder: "file-upload",
  alowedFormats: ["jpg", "png"]
});

const uploader = multer({ storage });

router.post("/create", uploader.single("file-uploaded"), (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
