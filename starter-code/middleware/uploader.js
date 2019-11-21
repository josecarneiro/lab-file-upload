const multer = require('multer');
const cloudinary = require('cloudinary');
const storageCloudinary = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = storageCloudinary({
  cloudinary,
  folder: 'profile-pics',
  allowedFormats: ['jpg', 'png']
});

const uploader = multer({
  storage
});

module.exports = uploader;
