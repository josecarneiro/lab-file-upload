 const express = require('express');

 const commentrouter = new express.Router();
 const User = require("./../models/user");
 const Comment = require('./../models/comment');

 const uploader = require('./../middleware/upload');
 const routeGuard = require('./../middleware/route-guard');



 commentrouter.post('/create/:post_id', routeGuard, uploader.array('images', 5), (req, res, next) => {

     const postId = req.params.post_id;
     const userId = req.user._id;


     const originalName = req.files[0].originalname;
     const urlImage = req.files[0].url;


     Comment.create({
             content: req.body.content,
             authorId: userId,
             imagePath: urlImage,
             imageName: originalName,
             postId: postId
         })
         .then(comment => {
             console.log('the comment was created', comment);
             res.redirect(`/post/${postId}`);
         })
         .catch(err => {
             console.log('not possible to create comment');
             next(err);
         });
 });


 module.exports = commentrouter;