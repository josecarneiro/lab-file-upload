const multer = require("multer");
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
  

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'ih-lab-file-upload',
  allowedFormats: ['jpg', 'png']
});


module.exports = multer({ storage: storage });